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
from openings import opening_table
from our_engine import ourEngine

def validate_user_moves(board, user_move, move_list):
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