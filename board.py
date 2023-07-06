# python chess library
import chess
# renders chess pieces/board/arrows
import chess.svg
# Read game files and play them
import chess.pgn
# opening book reading
import chess.polyglot
# endgame tablebase
import chess.syzygy
# temporary engine
import chess.engine
# Initalize chessboard display
from chessboard import display
from time import sleep
import sys


def check_if_game_ends(board):
    if board.is_checkmate():
        print("Checkmate")
        return True
    if board.is_stalemate():
        print("Stalemate")
        return True
    if board.is_insufficient_material():
        print("Insufficient Material")
        return True
    if board.can_claim_draw():
        print("Can Claim Draw")
        return True
    if board.can_claim_threefold_repetition():
        print("Can Claim Threefold Repetition")
        return True
    if board.can_claim_fifty_moves():
        print("Can Claim Fifty Moves")
        return True
    if board.is_fivefold_repetition():
        print("Is Fivefold Repetition")
        return True
    if board.is_seventyfive_moves():
        print("Completed 75 Moves")
        return True
    return False

def user_moves(board, game_board, move_list):
    new_move = input("Input your move: " )
    move_list.append(new_move)
    
    try:
        board.push_san(new_move)
        display.update(board.fen(), game_board)
    except chess.IllegalMoveError:
        print("Illegal Move Error!")
        return "continue" ## continue
    sleep(1)

def engine_moves(board, game_board, engine_list, engine):
    result = engine.play(board, chess.engine.Limit(time=2.0))
    engine_list.append(result)
    board.push(result.move)
    display.update(board.fen(), game_board)
    sleep(1)

def play_chess_game():
    user_color = input("Do you want to play as white or black? ")

    board = chess.Board()
    engine = chess.engine.SimpleEngine.popen_uci("stockfish")
    move_list = []
    engine_list = []

    while True:
        game_board = display.start(board.fen())

        if user_color == "white":
            if user_moves(board, game_board, move_list) == "continue":
                continue
            if check_if_game_ends(board):
                break
            elif board.is_check():
                print("Check")

            engine_moves(board, game_board, engine_list, engine)
            if check_if_game_ends(board):
                break
            elif board.is_check():
                print("Check")
        
        if user_color == "black":
            engine_moves(board, game_board, engine_list, engine)
            if check_if_game_ends(board):
                break
            elif board.is_check():
                print("Check")
            
            if user_moves(board, game_board, move_list) == "continue":
                continue
            if check_if_game_ends(board):
                break
            elif board.is_check():
                print("Check")

    engine.quit()
    display.terminate()
    print("Game Over")

play_chess_game()