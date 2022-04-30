import data_manager


def get_status_by_id(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s;
        """, {"status_id": status_id})
    return status


def get_boards():
    """
    Gather all boards
    :return:
    """
    return data_manager.execute_select(
        """
        SELECT * FROM boards
        order by id;
        """
    )


def get_cards_for_board(board_id):
    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s;
        """, {"board_id": board_id})
    return matching_cards


def login_query(login_name, login_password):
    login_database_check = data_manager.execute_select(
        """
        SELECT * FROM users
        WHERE users.user_name =  %(login_name)s AND users.password = %(login_password)s;
        """, {"login_name": login_name, "login_password": login_password}, False)
    return login_database_check


def register_query(register_name, register_password):
    data_manager.execute_insert(
        """
        INSERT INTO users
        VALUES(DEFAULT, %(register_name)s, %(register_password)s);
        """, {"register_name": register_name, "register_password": register_password})


def get_statuses_by_board_id(board_id):
    return data_manager.execute_select(
        """
        SELECT * FROM statuses
        WHERE board_id = %(board_id)s;
        """, {"board_id": board_id})


def remove_card_by_id(card_id):
    return data_manager.execute_delete(
        """DELETE FROM cards
        WHERE id = %(card_id)s;""", {'card_id': card_id}
    )


def add_board(user_id):
    return data_manager.execute_select("""
    INSERT INTO boards
        VALUES(DEFAULT, 'Board title', false, %(user_id)s) RETURNING id
    """, {'user_id': user_id}, fetchall=False)


def get_board_by_id(board_id):
    return data_manager.execute_select("""SELECT *
    FROM boards
    WHERE id = %(board_id)s;
    """, {'board_id': board_id}, fetchall=False)


def insert_default_board_statuses(board_id):
    data_manager.execute_insert("""INSERT INTO statuses
    VALUES (DEFAULT, 'new', %(board_id)s, 1);
    INSERT INTO statuses
    VALUES (DEFAULT, 'in progress', %(board_id)s, 2);
    INSERT INTO statuses
    VALUES (DEFAULT, 'done', %(board_id)s, 3);
    INSERT INTO statuses
    VALUES (DEFAULT, 'test', %(board_id)s, 4);
    """, {"board_id": board_id})


def update_card_position(card_id, position):
    data_manager.execute_insert("""UPDATE cards
    SET status = %(position)s
    where id=%(card_id)s;""", {'card_id': card_id, 'position': position})


def create_card(board_id):
    return data_manager.execute_select("""
    INSERT INTO cards
    VALUES(DEFAULT, %(board_id)s, 'new card', 1, 1) RETURNING id;""", {'board_id': board_id}, fetchall=False)


def get_card_by_id(card_id):
    return data_manager.execute_select("""
    SELECT *
    FROM cards
    WHERE id= %(card_id)s;""", {'card_id': card_id}, fetchall=False)


def delete_board_by_id(board_id):
    data_manager.execute_delete("""DELETE
    FROM boards
    WHERE id = %(board_id)s;
    """, {'board_id': board_id})


def rename_board(new_title, board_id):
    data_manager.execute_insert("""
    UPDATE boards
    SET title = %(new_title)s
    WHERE id = %(board_id)s;
    """, {'new_title': new_title, 'board_id': board_id})


def rename_card(new_title, card_id):
    data_manager.execute_insert("""
        UPDATE cards
        SET title = %(new_title)s
        WHERE id = %(card_id)s;
        """, {'new_title': new_title, 'card_id': card_id})
