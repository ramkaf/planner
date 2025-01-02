INSERT INTO review (user_id, event_id, content, rating)
SELECT
    (1 + (random() * 9)::int) AS user_id,  -- Random userId between 1 and 10
    (25 + (random() * 15)::int) AS event_id,  -- Random eventId between 25 and 40
    'Sample review content for event ' || (25 + (random() * 15)::int) AS content,  -- Dynamic content
    (1 + (random() * 5)::int) AS rating  -- Random rating between 1 and 5 (ensured by using random number between 1 and 5)
FROM generate_series(1, 50);  -- Generate 50 rows
