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
    def opening_moves(board, current_opening, white_list, black_list, engine_color):
        move_index = len(black_list) + 1 
        result = None 
        variation_name = ""
        
        moves_list = []
        for i in range(len(white_list)):
            try:
                moves_list.append([white_list[i], black_list[i]])
            except IndexError:
                break

        for line in current_opening["variations"]: 
            if not moves_list: 
                if engine_color == "white":
                    result = line[move_index][0]
                else:
                    result = line[move_index][1]
                board.push_san(result)
                variation_name=line[0]
                break
            else:
                if moves_list == line[1:move_index]:
                    if engine_color == "white":
                        result = line[move_index][0]
                    else:
                        try:
                            result = line[move_index][1]
                        except IndexError:
                            break
                    board.push_san(result)
                    variation_name=line[0]
                    break

                else: 
                    continue
        if not result: 
            engine = ourEngine(board, engine_color)
            result = board.san(engine.search(board, engine_color, 5))
            board.push_san(result)
        
        if engine_color == "white":
            engine_list = white_list
        else:
            engine_list = black_list

        new_engine_list = engine_list[:]
        new_engine_list.append(result)
        return [board.fen(), new_engine_list, variation_name]
    
    def call_engine_only(board, engine_list, engine_color): 
        engine = ourEngine(board, engine_color)
        if len(engine_list) >= 12: 
            depth = 5 
        result = board.san(engine.search(board, engine_color, depth=3))
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