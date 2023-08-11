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
#python's engine 
import chess.engine
# our engine
from our_engine import ourEngine
from copy import deepcopy

# Initalize chessboard display
from chessboard import display
from time import sleep
import time
from openings import opening_table


# board=chess.Board()
# queensgam = opening_table[0]["variations"][0]
# for i in range(1, len(queensgam)-5):
#     board.push_san(queensgam[i][0])
#     board.push_san(queensgam[i][1])
# board_copy = deepcopy(board)

# engine=ourEngine(board, "white", 5)
# start=time.time()
# board_copy.push(engine.search(board, 3, "white"))
# end=time.time()
# print(end-start)
# game_board = display.start(board.fen())
# sleep(10)

# test_engine=Testengine(board, "white", 5)
# start=time.time()
# board_copy.push(test_engine.search(board, 3, "white"))
# end=time.time()
# print(end-start)
# game_board = display.start(board.fen())
# sleep(10)

# new_board = chess.Board("rnbqkbnr/ppp1pppp/8/8/2pP4/5N2/PP2PPPP/RNBQKB1R b KQkq - 1 3")
# new_board.push_san("e6")
# print(new_board.fen())



# board = chess.Board()

# move = chess.Move.from_uci("a2a4")
# print(board.san(move))

for square in chess.SQUARES:
    print(square)