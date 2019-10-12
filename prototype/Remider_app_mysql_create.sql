create database birthday_reminder; 
use birthday_reminder;
CREATE USER 'reminder_app'@'localhost' IDENTIFIED BY '12345';

CREATE TABLE `users` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(80) NOT NULL,
	`email` varchar(63) NOT NULL,
	`pass_hash` varchar(255) NOT NULL,
	`role` enum ('user', 'admin') NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `events` (
		`id` bigint NOT NULL AUTO_INCREMENT,
		`date` DATE NOT NULL,
			`title` varchar(80) DEFAULT NULL,
		`description` varchar(255) DEFAULT NULL,
		`event_type_id` int NOT NULL,
			`user_id` int(11) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `event_types` (
        `id` bigint NOT NULL AUTO_INCREMENT,
	`type` varchar(80) NOT NULL,
	`is_annual` boolean DEFAULT 1,
	`description` varchar(255) DEFAULT NULL,
        `user_id` int(11) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `participants` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`name` varchar(80) NOT NULL,
	`last_name` varchar(80) DEFAULT NULL,
	`description` varchar(255) DEFAULT NULL,
        `user_id` int(11) NOT NULL,
	PRIMARY KEY (`id`) 
);

CREATE TABLE `event_to_participant` (
	`event_id` bigint NOT NULL,
	`participant_id` bigint NOT NULL,
	PRIMARY KEY (`event_id`,`participant_id`)
);

CREATE TABLE `reminders` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`datetime` DATETIME NOT NULL,
	`description` varchar(255) DEFAULT NULL,
        `event_id` bigint NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `events` ADD CONSTRAINT `events_fk0` FOREIGN KEY (`event_type_id`) REFERENCES `event_types`(`id`);

ALTER TABLE `events` ADD CONSTRAINT `events_fk1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `event_to_participant` ADD CONSTRAINT `event_to_participant_fk0` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`);

ALTER TABLE `event_to_participant` ADD CONSTRAINT `event_to_participant_fk1` FOREIGN KEY (`participant_id`) REFERENCES `participants`(`id`);

ALTER TABLE `reminders` ADD CONSTRAINT `reminders_fk0` FOREIGN KEY (`event_id`) REFERENCES `event`(`id`);

ALTER TABLE `event_types` ADD CONSTRAINT `event_types_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `participants` ADD CONSTRAINT `participants_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);
