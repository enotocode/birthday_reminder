/* Add event */
SELECT `id` FROM `users` WHERE name = 'admin'; /* 1 */
SELECT * FROM event_types WHERE user_id = 1; /* BIRTHDAY, WEDDING */
/* Add participant to event */
SELECT * FROM participants; 
SELECT * FROM participants; 
SELECT * FROM participants; 
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



