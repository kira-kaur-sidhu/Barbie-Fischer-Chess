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


board = chess.Board()
engine = chess.engine.SimpleEngine.popen_uci("stockfish")

move_list = []
engine_list = []


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


while True:
    game_board = display.start(board.fen())
    new_move = input("Input your move: " )
    move_list.append(new_move)
    
    try:
        board.push_san(new_move)
        display.update(board.fen(), game_board)
    except chess.IllegalMoveError:
        print("Illegal Move Error!")
        continue

    if check_if_game_ends(board):
        break
    elif board.is_check():
        print("Check")

    sleep(1)
    result = engine.play(board, chess.engine.Limit(time=2.0))
    engine_list.append(result)
    board.push(result.move)
    display.update(board.fen(), game_board)
    

    if check_if_game_ends(board):
        break
    elif board.is_check():
        print("Check")

    sleep(1)


engine.quit()
display.terminate()