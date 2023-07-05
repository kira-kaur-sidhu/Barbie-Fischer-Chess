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


board = chess.Board()
engine = chess.engine.SimpleEngine.popen_uci("stockfish")

move_list = []
engine_list = []

for _ in range(5):
    new_move = input("Input your move: " )

    move_list.append(new_move)

    game_board = display.start(board.fen())
    while not display.check_for_quit():
        if move_list:
            try:
                board.push_san(move_list.pop(0))
            except chess.IllegalMoveError:
                print("Illegal Move Error!")
                break
            display.update(board.fen(), game_board)
            result = engine.play(board, chess.engine.Limit(time=2.0))
            engine_list.append(result)
            board.push(result.move)
            display.update(board.fen(), game_board)
            if board.is_checkmate():
                print("Checkmate")
            elif board.is_check():
                print("Check")
        sleep(1)
        break


engine.quit()
display.terminate()