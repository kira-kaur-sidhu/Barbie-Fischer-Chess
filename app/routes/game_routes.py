from app import db 
import os 
from app.models.game import Game 
from flask import Blueprint, make_response, request, jsonify, abort 
import chess
# temporary engine
import chess.engine
# Initalize chessboard display
from chessboard import display
from time import sleep
from openings import opening_table
from our_engine import ourEngine

game_bp = Blueprint("game_bp", __name__, url_prefix="/games") 

# fix board.py for back and forth play
class ChessGame:
    def __init__(self, random=True):
        self.random = random

    def engine_moves(board, game_board, engine_list, engine):
        engine = ourEngine(board, "white")
        engine.evaluation("white")

    def opening_moves(board, engine_list, current_opening, move_list, engine):
        move_index = len(engine_list) + 1 
        result = None 

        for line in current_opening["variations"]: 
            if not move_list: 
                result = line[move_index][0]
                board.push_san(result)
                break
            elif len(move_list) > 0: 
                try:
                    if line[move_index-1][1] == move_list[-1] and engine_list[-1] == line[move_index-1][0]:
                        try:
                            result = line[move_index][0]
                            board.push_san(result)
                            break
                        except chess.IllegalMoveError:
                            continue
                    else: 
                        continue
                except IndexError:
                    continue 

        if not result: 
            result = engine.search(board, 3, "white")
            board.push(result)

        engine_list.append(result)
        return board.fen()
        

# validating function
def validate_item(model, item_id):
    try:
        item_id = int(item_id)
    except ValueError:
        return abort(make_response({"details": "invalid board"}, 400))
    
    return model.query.get_or_404(item_id)

# nested helper function
    # check if checkmate, game over, etc...
def check_game_status(board):
    if board.is_checkmate():
        return "Checkmate"
    if board.is_stalemate():
        return "Stalemate"
    if board.is_insufficient_material():
        return "Insufficient Material"
    if board.can_claim_draw():
        return "Can Claim Draw"
    if board.can_claim_threefold_repetition():
        return "Can Claim Threefold Repetition"
    if board.can_claim_fifty_moves():
        return "Can Claim Fifty Moves"
    if board.is_fivefold_repetition():
        return "Is Fivefold Repetition"
    if board.is_seventyfive_moves():
        return "Completed 75 Moves"
    return None


@game_bp.route("", methods=["POST"])
def start_game():
    request_body = request.get_json()
    new_board = chess.Board()

    request_body["fen"] = new_board.fen()

    new_game = Game.from_dict(request_body)

    db.session.add(new_game)
    db.session.commit()

    return {"id": int(new_game.game_id)}, 200

@game_bp.route("/<game_id>", methods=["PATCH"])
def get_user_move(game_id):
    game = validate_item(Game, game_id)

    request_body = request.get_json()

    game.fen = request_body["fen"]

    # current_status = check_game_status(game.board_init)
    # if current_status:
    #     game.game_status = current_status

    game.current_player = "engine"

    db.session.commit()

    return {"game": game.to_dict()}, 200

@game_bp.route("", methods=["GET"])
def get_games():
    response = []

    all_games = Game.query.all()

    response = [game.to_dict() for game in all_games]

    return jsonify(response), 200


@game_bp.route("/<game_id>", methods=["GET"])
def get_engine_move(game_id):
    game = validate_item(Game, game_id)
    current_board = chess.Board(game.fen)
    continue_game = ChessGame
    # current_status = check_game_status(current_board)
    # if current_status:
    #     game.game_status = current_status

    for item in opening_table:
        if game.opening == item["name"]:
            current_opening = item

    game.fen = continue_game.opening_moves(current_board, game.engine_move_list, current_opening, game.user_move_list, ourEngine)
    game.current_player = "player"

    response = game.to_dict() 

    return jsonify(response), 200 


@game_bp.route("/<game_id>", methods=["DELETE"])
def delete_game(game_id): 
    game = validate_item(Game, game_id)

    db.session.delete(game)
    db.session.commit()

    return{"details": f"Game {game_id} deleted"}, 200 