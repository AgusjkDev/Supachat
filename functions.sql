CREATE OR REPLACE FUNCTION get_profile_chats(p_id uuid)
RETURNS TABLE (
    chat chats,
    profile profiles
)
AS $$
BEGIN
    RETURN QUERY SELECT c, p2
    FROM
        chats c
        JOIN chatrooms cr ON cr.id = c.chatroom_id
        JOIN profiles p ON p.id = c.profile_id
        JOIN chats c2 ON c2.chatroom_id = cr.id
        JOIN profiles p2 ON p2.id = c2.profile_id
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
