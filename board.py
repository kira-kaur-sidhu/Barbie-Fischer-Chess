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

# Initalize chessboard 
# Create a dictionary to keep track of where pieces are by name - Sarah
# Create capture function for attacking pieces - Kim 
# Implement engine as the black player - Kira
# Figure out how to update display instead of having to close it out
# Understand the chess.E8 notation for, prints 60, what is 60? -> chess.squarenames pass in

board = chess.Board()
engine = chess.engine.SimpleEngine.popen_uci("stockfish")

move_list = [
    'e4', 'e5'
    ]


original_move = input("What do you want to move?: ")
new_move = input("Input your move: " )

if chess.Move.from_uci(original_move+new_move) in board.legal_moves:
    move_list.append(new_move)

# result = engine.play(board, chess.engine.Limit(time=2.0))
# print(result)
# engine.quit()

game_board = display.start(board.fen())
while not display.check_for_quit():
    if move_list:
        board.push_san(move_list.pop(0))
        display.update(board.fen(), game_board)
        if board.is_checkmate():
            print("Checkmate")
        elif board.is_check():
            print(chess.E8)
            print("Check")
    sleep(1)
display.terminate()