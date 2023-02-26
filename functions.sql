CREATE OR REPLACE FUNCTION create_chat_and_send_message(
    profile_id uuid, 
    chatter_profile_id uuid, 
    message text
) 
RETURNS messages
AS $$
DECLARE
	chat chats;
	inserted_message messages;
BEGIN
    INSERT INTO chats (id)
    VALUES (uuid_generate_v4())
    RETURNING * INTO chat;

    INSERT INTO chat_participants (profile_id, chat_id)
    VALUES (profile_id, chat.id), (chatter_profile_id, chat.id);

    INSERT INTO messages (content, profile_id, chat_id)
    VALUES (message, profile_id, chat.id)
    RETURNING * INTO inserted_message;

    RETURN inserted_message;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_profile_chats(p_id uuid) RETURNS TABLE (
    chat_id uuid,
    profile profiles
) AS $$
BEGIN
  RETURN QUERY SELECT
        c.id AS chat_id,
        p2
    FROM
        chat_participants cp
        JOIN chats c ON c.id = cp.chat_id
        JOIN profiles p ON p.id = cp.profile_id
        JOIN chat_participants cp2 ON cp2.chat_id = c.id
        JOIN profiles p2 ON p2.id = cp2.profile_id
    WHERE
        cp.profile_id = p_id
        AND p2.id <> p_id;
END;
$$ LANGUAGE plpgsql;