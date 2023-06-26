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

# Initalize chessboard
board = chess.Board()

move_list = []

game_board = display.start(board.fen())
while not display.check_for_quit():
    if move_list:
        board.push_san(move_list.pop(0))
        display.update(board.fen(), game_board)
    sleep(1)
display.terminate()