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

class ChessGame:
    def opening_moves(board, current_opening, engine_list, move_list, engine_color):
        move_index = len(engine_list) + 1 
        result = None 
        variation_name = ""

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
                            variation_name=line[0]
                            break
                        except chess.IllegalMoveError:
                            continue
                    else: 
                        continue
                except IndexError:
                    continue 

        if not result: 
            engine = ourEngine(board, engine_color)
            result = board.san(engine.search(board, 3, engine_color))
            board.push_san(result)

        new_engine_list = engine_list[:]
        new_engine_list.append(result)
        return [board.fen(), new_engine_list, variation_name]
    
    def call_engine_only(board, engine_list, engine_color): 
        engine = ourEngine(board, engine_color)
        result = board.san(engine.search(board, 3, engine_color))
        board.push_san(result)
        new_engine_list = engine_list[:]
        new_engine_list.append(result)
        return board.fen(), new_engine_list
    
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