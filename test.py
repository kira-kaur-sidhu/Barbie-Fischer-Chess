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
# our engine
from our_engine import ourEngine
# Initalize chessboard display
from chessboard import display
from time import sleep
from openings import opening_table


# def check_if_game_ends(board):
#     if board.is_checkmate():
#         print("Checkmate")
#         return True
#     if board.is_stalemate():
#         print("Stalemate")
#         return True
#     if board.is_insufficient_material():
#         print("Insufficient Material")
#         return True
#     if board.can_claim_draw():
#         print("Can Claim Draw")
#         return True
#     if board.can_claim_threefold_repetition():
#         print("Can Claim Threefold Repetition")
#         return True
#     if board.can_claim_fifty_moves():
#         print("Can Claim Fifty Moves")
#         return True
#     if board.is_fivefold_repetition():
#         print("Is Fivefold Repetition")
#         return True
#     if board.is_seventyfive_moves():
#         print("Completed 75 Moves")
#         return True
#     return False

# def user_moves(board, game_board, move_list):
#     new_move = input("Input your move: " )
    
#     try:
#         board.push_san(new_move)
#         move_list.append(new_move)
#         display.update(board.fen(), game_board)
#     except chess.IllegalMoveError:
#         print("Illegal Move Error!")
#         user_moves(board, game_board, move_list)
        
#     sleep(1)
#     return

# def engine_moves(board, game_board, engine_list, engine):
#     engine = ourEngine(board, "white")
#     engine.evaluation("white")

# def opening_moves(board, game_board, engine_list, current_opening, move_list, engine):
#     move_index = len(engine_list) + 1 
#     result = None 

#     for line in current_opening["variations"]: 
#         if not move_list: 
#             print("Moved")
#             result = line[move_index][0]
#             board.push_san(result)
#             break
#         elif len(move_list) > 0: 
#             try:
#                 if line[move_index-1][1] == move_list[-1] and engine_list[-1] == line[move_index-1][0]:
#                     try:
#                         print("Moved")
#                         result = line[move_index][0]
#                         board.push_san(result)
#                         break
#                     except chess.IllegalMoveError:
#                         continue
#                 else: 
#                     continue
#             except IndexError:
#                 continue 

#     if not result: 
#         result = engine.play(board, chess.engine.Limit(time=2.0))
#         board.push(result.move)

#     engine_list.append(result)
#     display.update(board.fen(), game_board)
#     sleep(1)



# def play_chess_game():
#     user_color = input("Do you want to play as white or black? ")
#     engine_opening = input("What opening do you want to play against? ")

#     for item in opening_table:
#         if engine_opening == item["name"]:
#             current_opening = item

#     board = chess.Board()
#     engine = chess.engine.SimpleEngine.popen_uci("stockfish")
#     move_list = []
#     engine_list = []

#     while True:
#         game_board = display.start(board.fen())

#         if user_color == "white":
#             user_moves(board, game_board, move_list)
#             if check_if_game_ends(board):
#                 winner = "white"
#                 break
#             elif board.is_check():
#                 print("Check")

#             engine_moves(board, game_board, engine_list, engine)
#             if check_if_game_ends(board):
#                 winner = "black"
#                 break
#             elif board.is_check():
#                 print("Check")
        
#         if user_color == "black":
#             opening_moves(board, game_board, engine_list, current_opening, move_list, engine)
#             if check_if_game_ends(board):
#                 winner = "white"
#                 break
#             elif board.is_check():
#                 print("Check")
            
#             user_moves(board, game_board, move_list)
#             if check_if_game_ends(board):
#                 winner = "black"
#                 break
#             elif board.is_check():
#                 print("Check")

#     engine.quit()
#     display.terminate()
#     # print(f"Game Over, Winner is {winner}") <--- fix this

# play_chess_game()

board = chess.Board()
board.push_san('Nf3')
board.push('e4')
board.push('e5')
board.push('d4')
board.push('d5')

game_board = display.start(board.fen())
# engine = ourEngine(board, "white", 3)

# print(engine.search(board, 1, "white"))
