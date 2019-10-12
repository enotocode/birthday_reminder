/* Add user */
INSERT INTO users VALUES (
    NULL,
    'admin',
    'hunnter@gmail.com',
    '$2y$10$3i9/lVd8UOFIJ6PAMFt8gu3/r5g0qeCJvoSlLCsvMTythye19F77a',
    'admin'
);
/* Add event type */
INSERT INTO event_types VALUES (
    NULL,
    'BIRTHDAY',
    1,
    'Anniversary of birth, corresponds to the date of birth of a person.',
    1
);
/* Add event type */
INSERT INTO event_types VALUES (
    NULL,
    'WEDDING',
    0,
    'A wedding is a ceremony where two people or a couple are united in marriage.',
    1
);

/* Add event */
SELECT `id` FROM `users` WHERE name = 'admin'; /* 1 */
SELECT * FROM event_types WHERE user_id = 1; /* BIRTHDAY, WEDDING */
INSERT INTO events VALUES (
    NULL,
    '2018-06-06',
    'Granny`s birthday',
    'She turns 101',
    1,
    1    
);   

/* Add event */
INSERT INTO events VALUES (
    NULL,
    '2018-03-18',
    'Old fashion wedding',
    'Everyone invited',
    2,
    1    
);  

/* Add event */
INSERT INTO events VALUES (
    NULL,
    '2018-01-30',
    'My brthd',
    'Go',
    1,
    1    
);  

/* Update event */
/* Delete event */

/* Create reminder and add it to event */
INSERT INTO reminders VALUES (
    NULL,
    '2018-06-06 10:00:00',
    'Phone your Granny',
    1
);
INSERT INTO reminders VALUES (
    NULL,
    '2018-04-01 10:00:00',
    'Get visa',
    2
);
INSERT INTO reminders VALUES (
    NULL,
    '2018-05-01 10:00:00',
    'Buy ticket',
    2
);

/* Update event */
/* Delete reminder */

/* Create participant */
INSERT INTO participants VALUES (
    NULL,
    'Granny',
    'Enotova',
    'My favorite granny',
    1
);

INSERT INTO participants VALUES (
    NULL,
    'Vova',
    NULL,
    NULL,
    1
);
INSERT INTO participants VALUES (
    NULL,
    'Russia',
    'Mother',
    NULL,
    1
);

/* Add participant to event */
SELECT * FROM participants; 
INSERT INTO event_to_participant VALUES(
    2, 
    2
);

SELECT * FROM participants; 
INSERT INTO event_to_participant VALUES(
    2, 
    3
);

SELECT * FROM participants; 
INSERT INTO event_to_participant VALUES(
    1, 
    1
);

/* Update participant */
/* Delete participant */

/* Get all events */
SELECT `id` FROM `users` WHERE name = 'user'; /* 1 */
SELECT e.id, e.date, e.title, e.description, et.type
FROM events AS e
    JOIN event_types AS et ON e.event_type_id = et.id
WHERE e.user_id = 1;

/* Get all events */
SELECT events.id, events.date, events.title, events.description, event_types.type
FROM events, event_types    
WHERE events.event_type_id = event_types.id
    AND events.user_id = 1;

/* Get events occuring in this month */
SELECT e.id, e.date, e.title, e.description, et.type
FROM events AS e
    JOIN event_types AS et ON e.event_type_id = et.id
WHERE e.user_id = 1 
    AND MONTH(e.date) = MONTH(CURRENT_DATE());

/* Get events occuring in next 30 days */
SELECT e.id, e.date, e.title, e.description, et.type
FROM events AS e
    JOIN event_types AS et ON e.event_type_id = et.id
WHERE e.user_id = 1 
    AND DAYOFYEAR(e.date) >= DAY(CURDATE())
    AND DAYOFYEAR(e.date) <= DAYOFYEAR(DATE_ADD(CURDATE(),INTERVAL 30 DAY));

/* Get events with type BIRTHDAY */
/* Get events with that participant */
SELECT e.id, e.date, e.title, e.description, et.type
FROM events AS e
    JOIN event_types AS et ON e.event_type_id = et.id
    JOIN event_to_participant AS etp ON etp.event_id = e.id
    JOIN participants AS p ON p.id = etp.participant_id
WHERE e.user_id = 1
    AND etp.participant_id = 1;

/* Get events and count participants for each event */
SELECT e.id, e.date, e.title, e.description, et.type,
    COUNT(*) AS participants
FROM events AS e
    JOIN event_types AS et ON e.event_type_id = et.id
    JOIN event_to_participant AS etp ON etp.event_id = e.id
    JOIN participants AS p ON p.id = etp.participant_id
WHERE e.user_id = 1
GROUP BY e.id;

/* Get all reminders */
/* Get event's reminders */

/* Get event's participants */
/* Get all participants */


SELECT * 
FROM events AS e
    JOIN event_types AS et ON e.event_type_id = et.id
    JOIN reminders AS r ON e.id = r.event_id
    JOIN event_to_participant AS etp ON etp.event_id = e.id
    JOIN participants AS p ON etp.participant_id = p.id 
WHERE e.user_id = 1
GROUP BY e.id;



