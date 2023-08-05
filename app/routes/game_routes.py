from app import db 
import os 
from app.models.game import Game 
from flask import Blueprint, make_response, request, jsonify, abort 
import chess
from flask_engine_call import validate_user_moves

game_bp = Blueprint("games", __name__, url_prefix="/games") 

# fix board.py for back and forth play

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

    validation = validate_user_moves(game.board_init, request_body["user_move"], game.move_list)
    if not validation:
        return {"details": "Invalid move"}, 401

    current_status = check_game_status(game.board_init)
    if current_status:
        game.game_status = current_status

    game.current_player = "engine"

    db.session.commit()

    return {"game": game.to_dict()}, 200


# GET ROUTE
    # call engine to play
        # should update fen
        # update move list
    # Player gets engine move from fen
        # board at FE should update their board using fen

#PATCH ROUTE for engine move 
    # call engine to play 
    #capture the board.fen after engine plays and update fen in database 

# GET ROUTE
    # Player gets engine move from fen
        # board at FE should update their board using fen

# @game_bp.route("/<game_id>", methods=["GET"])
# def get_engine_move(game_id):
#     game = validate_item(Game, game_id)

#     if game.game_status == "In Progress": 


    # request_body = request.get_json()

    # current_status = check_game_status(request_body)
    # if current_status:
    #     request_body["game_status"] = current_status

# DELETE ROUTE
    # delete after game has been completed

@game_bp.route("/<game_id>", methods=["DELETE"])
def delete_game(game_id): 
    game = validate_item(Game, game_id)

    db.session.delete(game)
    db.session.commit()

    return{"details": f"Game {game_id} deleted"}, 200 