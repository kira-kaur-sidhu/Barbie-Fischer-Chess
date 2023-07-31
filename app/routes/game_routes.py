# from app import db 
# import os 
# from app.models.game import Game 
# from flask import Blueprint, make_response, request, jsonify, abort 
import chess

# game_bp = Blueprint("games", __name__, url_prefix="/games") 

board = chess.Board('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
print(type(board))