from app import db 
import os 
from app.models.game import Game 
from flask import Blueprint, make_response, request, jsonify, abort 
import chess

game_bp = Blueprint("games", __name__, url_prefix="/games") 

# fix board.py for back and forth play

# validating function

# POST ROUTE
    # When player clicks on new game
    # create a board python-chess board
    # if engine is white player, add first engine move
        # fen should be new board fen
        # update move lust
    # if player is white
        # initalize board to inital fen

# PATCH ROUTE
    # When player moves
        # should update fen
        # should update board
        # update move list


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
