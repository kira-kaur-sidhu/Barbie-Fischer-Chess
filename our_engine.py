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
from copy import deepcopy

class ourEngine:
    def __init__(self, board, engine_color, thinking_time=0):
        self.board = board
        self.thinking_time = thinking_time
        self.engine_color = engine_color

    def evaluate(self, board):
        piece_values = {
            "P": 100,
            "p": -100,
            "R": 500,
            "r": -500,
            "B": 300,
            "b": -300,
            "N": 300,
            "n": -300,
            "Q": 900,
            "q": -900,
            "K": 10000,
            "k": -10000,
        }

        pawn_table_white = [    
            0,  0,  0,  0,  0,  0,  0,  0,
            5, 10, 10, -20, -20, 10, 10,  5,
            5, -5, -10,  0,  0, -10, -5,  5,
            0,  0,  0, 20, 20,  0,  0,  0,
            5,  5, 10, 25, 25, 10,  5,  5,
            10, 10, 20, 30, 30, 20, 10, 10,
            50, 50, 50, 50, 50, 50, 50, 50,
            0, 0, 0, 0, 0, 0, 0, 0
        ]
        pawn_table_black = list(reversed(pawn_table_white))


        rook_table_white = [
            0, 0, 0, 5, 5, 0, 0, 0,
            -5, 0, 0, 0, 0, 0, 0, -5,
            -5, 0, 0, 0, 0, 0, 0, -5,
            -5, 0, 0, 0, 0, 0, 0, -5,
            -5, 0, 0, 0, 0, 0, 0, -5,
            -5, 0, 0, 0, 0, 0, 0, -5,
            5, 10, 10, 10, 10, 10, 10, 5,
            0, 0, 0, 0, 0, 0, 0, 0
        ]
        rook_table_black = list(reversed(rook_table_white))

        bishop_table_white = [
            -20, -10, -10, -10, -10, -10, -10, -20,
            -10, 5, 0, 0, 0, 0, 5, -10,
            -10, 10, 10, 10, 10, 10, 10, -10,
            -10, 0, 10, 10, 10, 10, 0, -10,
            -10, 5, 5, 10, 10, 5, 5, -10,
            -10, 0, 5, 10, 10, 5, 0, -10,
            -10, 0, 0, 0, 0, 0, 0, -10,
            -20, -10, -10, -10, -10, -10, -10, -20
        ]
        bishop_table_black = list(reversed(bishop_table_white))

        knight_table_white = [
            -50, -40, -30, -30, -30, -30, -40, -50,
            -40, -20, 0, 0, 0, 0, -20, -40,
            -30, 0, 10, 15, 15, 10, 0, -30,
            -30, 5, 15, 20, 20, 15, 5, -30,
            -30, 0, 15, 20, 20, 15, 0, -30,
            -30, 5, 10, 15, 15, 10, 5, -30,
            -40, -20, 0, 5, 5, 0, -20, -40,
            -50, -40, -30, -30, -30, -30, -40, -50
        ]
        knight_table_black = list(reversed(knight_table_white))

        queen_table_white = [
            -20, -10, -10, -5, -5, -10, -10, -20,
            -10, 0, 0, 0, 0, 0, 0, -10,
            -10, 0, 5, 5, 5, 5, 0, -10,
            -5, 0, 5, 5, 5, 5, 0, -5,
            0, 0, 5, 5, 5, 5, 0, -5,
            -10, 5, 5, 5, 5, 5, 0, -10,
            -10, 0, 5, 0, 0, 0, 0, -10,
            -20, -10, -10, -5, -5, -10, -10, -20
        ]
        queen_table_black = list(reversed(queen_table_white))

        king_table_white = [
            20, 30, 10, 0, 0, 10, 30, 20,
            20, 20, 0, 0, 0, 0, 20, 20,
            -10, -20, -20, -20, -20, -20, -20, -10,
            20, -30, -30, -40, -40, -30, -30, -20,
            -30, -40, -40, -50, -50, -40, -40, -30,
            -30, -40, -40, -50, -50, -40, -40, -30,
            -30, -40, -40, -50, -50, -40, -40, -30,
            -30, -40, -40, -50, -50, -40, -40, -30
        ]
        king_table_black = list(reversed(king_table_white))

        piece_to_table = {
            "P": pawn_table_white,
            "p": pawn_table_black,
            "R": rook_table_white,
            "r": rook_table_black,
            "B": bishop_table_white,
            "b": bishop_table_black,
            "N": knight_table_white,
            "n": knight_table_black,
            "Q": queen_table_white,
            "q": queen_table_black,
            "K": king_table_white,
            "k": king_table_black,
        }

        score = 0
        for square in chess.SQUARES:
            piece = board.piece_at(square)
            if piece:
                score += piece_values[str(piece)]
                score += piece_to_table[str(piece)][square]

        return score
    
    def search(self, board, depth, engine_color, alpha=float("-inf"), beta=float("inf")):
        ## deepcopy of board
        # if depth == 0 or game ends(checkmate, stalemate, etc...)
            # RETURN call evaluation function (white or black, whatever engine is)
        
        # if white's turn
            # maxEval = -inf
            #for each legal move possible in board from white
                # eval = search(legal move, depth-1, white)
                #maxEval = max(maxEval, eval)
            # RETURN maxEval
        
        # if black's turn
            # minEval = +inf
            #for each legal move possible in board from black's turn
                # eval = search(legal move, depth-1, black)
                # minEval = min(minEval, eval)
            #RETURN minEval
        
        # board_copy = deepcopy(self.board)
        if engine_color == "white":
            maxEval = float("-inf")
            best_move_white = None
            for move in list(board.legal_moves):
                board_copy = deepcopy(board)
                board_copy.push(move)
                if depth > 1: 
                    temp_result = self.search(board_copy, depth-1, "black", alpha, beta)
                    board_copy.push(temp_result)
                
                eval = self.evaluate(board_copy)
                
                if max(maxEval, eval) == eval:
                    maxEval = eval
                    best_move_white = move
                    
                alpha = max(alpha, eval)
                if beta <= alpha: 
                    break
            return best_move_white
        
        else:
            minEval = float('inf')
            best_move_black = None
            for move in list(board.legal_moves):
                board_copy = deepcopy(board)
                board_copy.push(move)
                if depth > 1: 
                    temp_result = self.search(board_copy, depth-1, "white", alpha, beta)
                    board_copy.push(temp_result)
                
                eval = self.evaluate(board_copy)

                if min(minEval, eval) == eval:
                    minEval = eval
                    best_move_black = move

                beta = min(beta, eval)
                if beta <= alpha: 
                    break
            return best_move_black