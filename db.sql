CREATE OR REPLACE FUNCTION get_profile_chats(p_id uuid)
RETURNS TABLE (
    chat chats,
    last_message messages,
    profile profiles
)
AS $$
BEGIN
    RETURN QUERY SELECT c, m, p2
    FROM
        chats c
        JOIN chatrooms cr ON cr.id = c.chatroom_id
        JOIN profiles p ON p.id = c.profile_id
        JOIN chats c2 ON c2.chatroom_id = cr.id
        JOIN profiles p2 ON p2.id = c2.profile_id
        JOIN messages m ON m.id = cr.last_message
    WHERE
        c.profile_id = p_id
        AND p2.id <> p_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION send_message_to_chat(
    sender_profile_id uuid,
    receiver_profile_id uuid,
    chat chats,
    message text
)
RETURNS TABLE (
    created_chat chats,
    inserted_message messages
)
AS $$
DECLARE
    created_chatroom_id uuid;
BEGIN
    IF chat.id IS NULL THEN
        INSERT INTO chatrooms (id)
        VALUES (uuid_generate_v4())
        RETURNING id INTO created_chatroom_id;

        INSERT INTO chats (chatroom_id, profile_id)
        VALUES (created_chatroom_id, sender_profile_id)
        RETURNING * INTO created_chat;

        INSERT INTO chats (chatroom_id, profile_id)
        VALUES (created_chatroom_id, receiver_profile_id);

        INSERT INTO messages (chatroom_id, profile_id, content)
        VALUES (created_chatroom_id, sender_profile_id, message)
        RETURNING * INTO inserted_message;

        RETURN QUERY SELECT created_chat, inserted_message;
    ELSE
        INSERT INTO messages (chatroom_id, profile_id, content)
        VALUES (chat.chatroom_id, sender_profile_id, message)
        RETURNING * INTO inserted_message;

        IF chat.is_hidden IS true THEN
            UPDATE chats SET is_hidden = false
            WHERE profile_id = sender_profile_id
            AND chatroom_id = chat.chatroom_id
            RETURNING * INTO chat;
        END IF;

        RETURN QUERY SELECT chat, inserted_message;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION update_last_message() RETURNS trigger AS $$
BEGIN
  UPDATE chatrooms
  SET last_message = NEW.id
  WHERE id = NEW.chatroom_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_last_message
AFTER INSERT ON messages
FOR EACH ROW
EXECUTE FUNCTION update_last_message();

CREATE OR REPLACE FUNCTION get_chatroom_info(
  p_id uuid, 
  cr_id uuid
) RETURNS TABLE (
  profile profiles,
  messages messages
)
AS $$
BEGIN
    RETURN QUERY SELECT p, m
    FROM
        chats c
        JOIN profiles p ON p.id = c.profile_id
        JOIN messages m ON m.chatroom_id = c.chatroom_id
    WHERE
        c.chatroom_id = cr_id
        AND p.id <> p_id;
END;
$$ LANGUAGE plpgsql;