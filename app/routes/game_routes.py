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

    def validate_user_moves(self, board, user_move, move_list):
        try:
            board.push_san(user_move)
            move_list.append(user_move)
        except chess.IllegalMoveError:
            return False

        return True

    def engine_moves(board, game_board, engine_list, engine):
        engine = ourEngine(board, "white")
        engine.evaluation("white")

    def opening_moves(board, game_board, engine_list, current_opening, move_list, engine):
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
        display.update(board.fen(), game_board)
        sleep(1)

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

@game_bp.route("", methods=["POST"])
def start_game():
    request_body = request.get_json()
    new_board = chess.Board()

    request_body["fen"] = new_board.fen()

    new_game = Game.from_dict(request_body)

    db.session.add(new_game)
    db.session.commit()

    return {"id": int(new_game.game_id)}, 200

# PATCH ROUTE
    # When player moves
        # should update fen
        # should update board
        # update move list
@game_bp.route("/<game_id>", methods=["PATCH"])
def get_user_move(game_id):
    game = validate_item(Game, game_id)

    request_body = request.get_json()

    validation = ChessGame.validate_user_moves(game.board_init, request_body["user_move"], game.move_list)
    if not validation:
        return {"details": "Invalid move"}, 401
    else:
        game.fen = validation.fen()

    current_status = check_game_status(game.board_init)
    if current_status:
        game.game_status = current_status

    game.current_player = "engine"

    db.session.commit()

    return {"game": game.to_dict()}, 200

@game_bp.route("", methods=["GET"])
def get_games():
    response = []

    all_games = Game.query.all()

    response = [game.to_dict() for game in all_games]

    return jsonify(response), 200

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