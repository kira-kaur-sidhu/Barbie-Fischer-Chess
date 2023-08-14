from app import db 
import os 
from app.models.game import Game 
from flask import Blueprint, make_response, request, jsonify, abort 
import chess
from openings import opening_table
from engine_call import ChessGame

game_bp = Blueprint("game_bp", __name__, url_prefix="/games") 

# validating function
def validate_item(model, item_id):
    try:
        item_id = int(item_id)
    except ValueError:
        return abort(make_response({"details": "invalid board"}, 400))
    
    return model.query.get_or_404(item_id)
    
# POST Route to start game with opening 
@game_bp.route("", methods=["POST"])
def start_game():
    request_body = request.get_json()
    new_board = chess.Board()
    request_body["engine_move_list"] = []
    request_body["user_move_list"] = []

    if request_body["white"] == "engine":
        new_game = ChessGame
        for item in opening_table:
            if request_body["opening"] == item["name"]:
                current_opening = item

        data = new_game.opening_moves(new_board, current_opening, [], [], "white")
        request_body["engine_move_list"] = data[1]

    request_body["fen"] = new_board.fen()

    game = Game.from_dict(request_body)

    db.session.add(game)
    db.session.commit()

    return jsonify(game.to_dict()), 200

# PATCH route to receive user move and send back engine move
@game_bp.route("/<game_id>", methods=["PATCH"])
def get_user_engine_move(game_id):
    game = validate_item(Game, game_id)

    request_body = request.get_json()

    game.fen = request_body["fen"]
    game.user_move_list = request_body["user_move_list"]
    new_board = chess.Board(game.fen)
    new_game = ChessGame

    current_status = new_game.check_game_status(new_board)
    if current_status:
        game.game_status = current_status
    else:
        for item in opening_table:
            if game.opening == item["name"]:
                current_opening = item

        if game.white == "engine":
            engine_color = "white"
            data = new_game.opening_moves(new_board, current_opening, game.engine_move_list, game.user_move_list, engine_color)
        else:
            engine_color = "black"
            data = new_game.opening_moves(new_board, current_opening, game.user_move_list, game.engine_move_list, engine_color)

        game.fen = data[0]
        game.engine_move_list = data[1]
        game.opening_variation = data[2][0]
        updated_board = chess.Board(game.fen)
        current_status = new_game.check_game_status(updated_board)
        if current_status:
            game.game_status = current_status

    db.session.commit()

    return {"game": game.to_dict()}, 200

#POST route to start game without opening 
@game_bp.route("/no_opening", methods=["POST"])
def start_game_without_opening(): 
    request_body = request.get_json()
    new_board = chess.Board()
    new_game = ChessGame
    data = new_game.call_engine_only(new_board,[],"white")
    request_body["engine_move_list"] = data[1]
    request_body["fen"] = new_board.fen()
    game = Game(fen=request_body["fen"],
    engine_move_list=request_body["engine_move_list"])
    db.session.add(game)
    db.session.commit()

    return jsonify(game.to_dict()),200

#PATCH route to continue game without opening 
@game_bp.route("no_opening/<game_id>", methods=["PATCH"])
def continue_game(game_id): 
    game = validate_item(Game, game_id)

    request_body = request.get_json()

    game.fen = request_body["fen"]
    game.user_move_list = request_body["user_move_list"]
    new_board = chess.Board(game.fen)
    new_game = ChessGame
    current_status = new_game.check_game_status(new_board)
    if current_status:
        game.game_status = current_status
    else:
        if game.white == "engine":
            engine_color = "white"
        else:
            engine_color = "black"
        data = new_game.call_engine_only(new_board, game.engine_move_list, engine_color)
        game.fen = data[0]
        game.engine_move_list = data[1]

    db.session.commit()
    return jsonify(game.to_dict()),200


@game_bp.route("", methods=["GET"])
def get_games():
    response = []

    all_games = Game.query.all()

    response = [game.to_dict() for game in all_games]

    return jsonify(response), 200


@game_bp.route("/<game_id>", methods=["GET"])
def get_engine_move(game_id):
    game = validate_item(Game, game_id)

    response = game.to_dict() 

    db.session.commit()

    return jsonify(response), 200 


@game_bp.route("/<game_id>", methods=["DELETE"])
def delete_game(game_id): 
    game = validate_item(Game, game_id)

    db.session.delete(game)
    db.session.commit()

    return{"details": f"Game {game_id} deleted"}, 200 