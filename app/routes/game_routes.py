from app import db 
import os 
from app.models.game import Game 
from flask import Blueprint, make_response, request, jsonify, abort 
import chess

game_bp = Blueprint("games", __name__, url_prefix="/games") 

# fix board.py for back and forth play

# validating function
def validate_item(model, item_id):
    try:
        item_id = int(item_id)
    except ValueError:
        return abort(make_response({"details": "invalid board"}, 400))
    
    return model.query.get_or_404(item_id)

def check_game_status(request_body):
    if request_body["board"].is_checkmate():
        return "Checkmate"
    if request_body["board"].is_stalemate():
        return "Stalemate"
    if request_body["board"].is_insufficient_material():
        return "Insufficient Material"
    if request_body["board"].can_claim_draw():
        return "Can Claim Draw"
    if request_body["board"].can_claim_threefold_repetition():
        return "Can Claim Threefold Repetition"
    if request_body["board"].can_claim_fifty_moves():
        return "Can Claim Fifty Moves"
    if request_body["board"].is_fivefold_repetition():
        return "Is Fivefold Repetition"
    if request_body["board"].is_seventyfive_moves():
        return "Completed 75 Moves"
    return None

# POST ROUTE
    # When player clicks on new game
    # create a board python-chess board
    # if engine is white player, add first engine move
        # fen should be new board fen
        # update move lust
    # if player is white
        # initalize board to inital fen
@game_bp("/<game_id>/games", methods=["POST"])
def start_game(game_id):

    new_game = chess.Board()

    request_body = request.get_json()
    request_body["board"] = new_game
    request_body["fen"] = new_game.fen
    request_body["status"] = "In Progress"

    db.session.commit()

    return {"id": int(game_id)}, 200

# PATCH ROUTE
    # When player moves
        # should update fen
        # should update board
        # update move list
@game_bp.route("/<game_id>", methods=["PATCH"])
def get_user_move(game_id):
    game = validate_item(Game, game_id)

    request_body = request.get_json()

    current_status = check_game_status(request_body)
    if current_status:
        request_body["game_status"] = current_status
    
    game.fen = request_body["fen"]
    game.board_init = chess.Board(game.fen)
    game.move_list.append(request_body["move_list"][-1])
    # game.current_player <-- do later

    db.session.commit()

    return {"game": game.to_dict()}, 200


# GET ROUTE
    # call engine to play
        # should update fen
        # update move list
    # Player gets engine move from fen
        # should update their board

# nested helper function
    # check if checkmate, game over, etc...

# DELETE ROUTE
    # delete after game has been completed
@game_bp.route("/<game_id>", methods=["GET"])
def call_engine(game_id):
    game = validate_item(Game, game_id)

    request_body = request.get_json()

    current_status = check_game_status(request_body)
    if current_status:
        request_body["game_status"] = current_status
    
    