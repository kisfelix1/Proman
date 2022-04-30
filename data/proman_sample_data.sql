--
-- PostgreSQL database Proman
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET default_tablespace = '';

SET default_with_oids = false;

---
--- drop tables
---

DROP TABLE IF EXISTS rel_board_status CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS statuses CASCADE;
DROP TABLE IF EXISTS boards CASCADE;
DROP TABLE IF EXISTS cards;

---
--- create tables
---

CREATE TABLE statuses (
    id       SERIAL PRIMARY KEY     NOT NULL,
    title    VARCHAR(200)           NOT NULL,
    board_id INTEGER                NOT NULL,
    position INTEGER                NOT NULL

);

CREATE TABLE boards (
    id          SERIAL PRIMARY KEY  NOT NULL,
    title       VARCHAR(200)        NOT NULL,
    is_public      BOOLEAN,
    user_id     INTEGER
);

CREATE TABLE cards (
    id          SERIAL PRIMARY KEY  NOT NULL,
    board_id    INTEGER             NOT NULL,
    title       VARCHAR (200)       NOT NULL,
    position    INTEGER,
    status      INTEGER
);

CREATE TABLE users(
    id          SERIAL PRIMARY KEY NOT NULL,
    user_name   VARCHAR(200) NOT NULL UNIQUE,
    password    VARCHAR(200)
);

---
--- insert data
---

INSERT INTO statuses VALUES (DEFAULT, 'new', 1, 1);
INSERT INTO statuses VALUES (DEFAULT, 'in progress', 1, 2);
INSERT INTO statuses VALUES (DEFAULT, 'done', 1, 3);
INSERT INTO statuses VALUES (DEFAULT, 'test', 1, 4);
INSERT INTO statuses VALUES (DEFAULT, 'new', 2, 1);
INSERT INTO statuses VALUES (DEFAULT, 'in progress', 2, 2);
INSERT INTO statuses VALUES (DEFAULT, 'done', 2, 3);
INSERT INTO statuses VALUES (DEFAULT, 'test', 2, 4);

INSERT INTO boards VALUES (DEFAULT, 'Board 1', true, 1);
INSERT INTO boards VALUES (DEFAULT, 'Board 2', false, 1);

INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 'new card 1', 1, 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 'new card 2', 2, 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 'in progress card', 1, 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 'planning', 1, 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 'done card 1', 1, 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 'done card 1', 2, 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 'new card 1', 1, 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 'new card 2', 2, 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 'in progress card', 1, 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 'planning', 1, 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 'done card 1', 1, 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 'done card 1', 2, 1);

INSERT INTO users VALUES (DEFAULT, 'jozsi', 'asd');
---
--- add constraints
---

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_cards_board_id FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE;

ALTER TABLE ONLY boards
    ADD CONSTRAINT fk_boards_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE ONLY statuses
    ADD CONSTRAINT fk_statuses_board_id FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE;
