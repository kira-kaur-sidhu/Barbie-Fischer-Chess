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
        """
        The function "opening_moves" takes in a chess board, a current opening, a list of moves made by white, a list of moves made by black, and the color of the engine. It then determines the next move to be made based on the current opening and the moves made so far, if it is no longer following an opening line it calls the engine to make a move and returns the updated board position, the updated list of moves, and the name of the variation used.
        
        :param board: The current state of the chess board
        :param current_opening: The `current_opening` parameter is a dictionary that represents the current opening being played. It contains information about the opening, such as its name and variations and moves
        :param white_list: The `white_list` parameter is a list of moves played by the white player in the game so far. It contains the moves in the order they were played
        :param black_list: The `black_list` parameter is a list of moves made by the black player in the game so far
        :param engine_color: The `engine_color` parameter represents the color of the engine, which can be either "white" or "black"
        :return: a list containing the FEN representation of the board after the move, the updated engine list, and the name of the variation used for the move.
        """
        move_index = len(black_list) + 1 
        result = None 
        variation_name = [""]
        
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
            result = board.san(engine.search(board, engine_color, 3))
            board.push_san(result)
        
        if engine_color == "white":
            engine_list = white_list
        else:
            engine_list = black_list

        new_engine_list = engine_list[:]
        new_engine_list.append(result)
        return [board.fen(), new_engine_list, variation_name]
    
    def call_engine_only(board, engine_list, engine_color):
        """
        The function takes a chess board, a list of chess engines, and a color as input, and returns the updated chess board FEN notation and the updated list of chess engines after making a move using our engine.
        
        :param board: The "board" parameter is an object that represents the current state of the chess board. It contains information about the positions of the pieces and other relevant game data
        :param engine_list: A list that contains the moves made by the engine so far
        :param engine_color: The `engine_color` parameter represents the color of the engine, which can be either "white" or "black"
        :return: a tuple containing the FEN representation of the board after the move is made, and the updated engine_list.
        """
        engine = ourEngine(board, engine_color)
        depth = 3 
        if len(engine_list) >= 12: 
            depth = 5 
        result = board.san(engine.search(board, engine_color, depth))
        print(result)
        board.push_san(result)
        new_engine_list = engine_list[:]
        new_engine_list.append(result)
        return board.fen(), new_engine_list
    
    def check_game_status(board):
        """
        This function checks the status of a chess game based on the given board and returns a string indicating the end conditions of the game
        
        :param board: The parameter "board" represents the current state of a chess game.
        :return: a string indicating the status of the game.
        """
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
