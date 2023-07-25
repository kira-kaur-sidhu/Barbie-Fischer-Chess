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

class Testengine:
    def __init__(self, board, engine_color, thinking_time=0):
        self.board = board
        self.thinking_time = thinking_time
        self.engine_color = engine_color

    def evaluate(self, board):
        piece_values = {
            "P": 1,
            "p": -1,
            "R": 5,
            "r": -5,
            "B": 3,
            "b": -3,
            "N": 3,
            "n": -3,
            "Q": 9,
            "q": -9,
            "K": 100,
            "k": -100,
        }
        score = 0
        for square in chess.SQUARES:
            piece = board.piece_at(square)
            if piece:
                score += piece_values[str(piece)]

        return score
    
    def search(self, board, depth, player):
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
        if player == "white":
            maxEval = float("-inf")
            best_move_white = None
            for move in list(board.legal_moves):
                board_copy = deepcopy(board)
                board_copy.push(move)
                if depth > 1: 
                    temp_result = self.search(board_copy, depth-1, "black")
                    board_copy.push(temp_result)
                
                eval = self.evaluate(board_copy)

                
                if max(maxEval, eval) == eval:
                    maxEval = eval
                    best_move_white = move
            return best_move_white
        
        else:
            minEval = float('inf')
            best_move_black = None
            for move in list(board.legal_moves):
                board_copy = deepcopy(board)
                board_copy.push(move)
                if depth > 1: 
                    temp_result = self.search(board_copy, depth-1, "white")
                    board_copy.push(temp_result)
                
                eval = self.evaluate(board_copy) 
                
                if min(minEval, eval) == eval:
                    minEval = eval
                    best_move_black = move
            return best_move_black