import mimetypes
import queires
import os
import psycopg2
from flask import Flask, render_template, url_for, session, request, jsonify
from dotenv import load_dotenv
from util import json_response
import mimetypes
import queires

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
load_dotenv(".env")
# payload, execute insert, execute delete

connection_string = os.environ.get('DATABASE_URL')
connection = psycopg2.connect(connection_string)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/api/boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return queires.get_boards()


@app.route("/api/<int:board_id>/statuses")
@json_response
def get_statuses_for_board(board_id):
    return queires.get_statuses_by_board_id(board_id)


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queires.get_cards_for_board(board_id)


@app.route("/api/login", methods=["GET", "POST"])
@json_response
def login_user():
    return queires.login_query(request.json['username'], request.json['password'])


@app.route("/api/register", methods=["GET", "POST"])
@json_response
def register_user():
    return queires.register_query(request.json['username'], request.json['password'])


@app.route("/api/<int:board_id>/statuses")
@json_response
def get_statuses_by_board_id(board_id):
    return queires.get_statuses_by_board_id(board_id)


@app.route("/api/remove/card/<int:card_id>", methods=["POST"])
@json_response
def remove_card(card_id):
    return queires.remove_card_by_id(card_id)


@app.route("/api/create/board/<user_id>", methods=["POST"])
@json_response
def add_board(user_id):
    board_id = queires.add_board(user_id)
    queires.insert_default_board_statuses(board_id['id'])
    return board_id


@app.route("/api/update/card/<card_id>", methods=['PUT'])
@json_response
def update_card_position(card_id):
    return queires.update_card_position(card_id, request.json['position'])


@app.route("/api/board/<board_id>")
@json_response
def get_board(board_id):
    return queires.get_board_by_id(board_id)


@app.route("/api/delete/board/<board_id>", methods=['DELETE'])
@json_response
def delete_board(board_id):
    return queires.delete_board_by_id(board_id)


@app.route("/api/create/card/<board_id>", methods=['POST'])
@json_response
def create_card(board_id):
    card_id = queires.create_card(board_id)
    return queires.get_card_by_id(card_id['id'])


@app.route("/api/board/rename", methods=['PUT'])
@json_response
def rename_board():
    return queires.rename_board(request.json['title'], request.json['id'])


@app.route("/api/card/rename", methods=['PUT'])
@json_response
def rename_card():
    return queires.rename_card(request.json['title'], request.json['id'])


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
