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

def check_if_game_ends(board):
    if board.is_checkmate():
        print("Checkmate")
        return True
    if board.is_stalemate():
        print("Stalemate")
        return True
    if board.is_insufficient_material():
        print("Insufficient Material")
        return True
    if board.can_claim_draw():
        print("Can Claim Draw")
        return True
    if board.can_claim_threefold_repetition():
        print("Can Claim Threefold Repetition")
        return True
    if board.can_claim_fifty_moves():
        print("Can Claim Fifty Moves")
        return True
    if board.is_fivefold_repetition():
        print("Is Fivefold Repetition")
        return True
    if board.is_seventyfive_moves():
        print("Completed 75 Moves")
        return True
    return False

def user_moves(board, game_board, move_list):
    new_move = input("Input your move: " )
    
    try:
        board.push_san(new_move)
        move_list.append(new_move)
        display.update(board.fen(), game_board)
    except chess.IllegalMoveError:
        print("Illegal Move Error!")
        user_moves(board, game_board, move_list)
        
    sleep(1)
    return

def opening_moves(board, game_board, current_opening, white_list, black_list, engine, engine_color):
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
                try:
                    result = line[move_index][1]
                except IndexError:
                    break
            board.push_san(result)
            variation_name=line[0]
            break
        else:
            if moves_list == line[1:move_index]:
                if engine_color == "white":
                    result = line[move_index][0]
                else:
                    result = line[move_index][1]
                board.push_san(result)
                variation_name=line[0]
                break

            else: 
                continue

    if not result: 
        result = board.san(engine.search(board, 5, engine_color))
        board.push_san(result)
    
    if engine_color == "white":
        engine_list = white_list
    else:
        engine_list = black_list

    engine_list.append(result)
    print(moves_list)
    display.update(board.fen(), game_board)
    sleep(1)



def play_chess_game():
    user_color = input("Do you want to play as white or black? ")
    if user_color == "white":
        engine_color = "black"
    else:
        engine_color = "white"
    engine_opening = input("What opening do you want to play against? ")

    for item in opening_table:
        if engine_opening == item["name"]:
            current_opening = item

    board = chess.Board()
    engine = ourEngine(board, engine_color, 3)
    move_list = []
    engine_list = []

    while True:
        game_board = display.start(board.fen())

        if user_color == "white":
            user_moves(board, game_board, move_list)
            if check_if_game_ends(board):
                winner = "white"
                break
            elif board.is_check():
                print("Check")

            opening_moves(board, game_board, current_opening, move_list, engine_list, engine, engine_color)
            if check_if_game_ends(board):
                winner = "black"
                break
            elif board.is_check():
                print("Check")
        
        if user_color == "black":
            opening_moves(board, game_board, current_opening, engine_list, move_list, engine, engine_color)
            if check_if_game_ends(board):
                winner = "white"
                break
            elif board.is_check():
                print("Check")
            
            user_moves(board, game_board, move_list)
            if check_if_game_ends(board):
                winner = "black"
                break
            elif board.is_check():
                print("Check")

    print(f"{winner} wins!")
    engine.quit()
    display.terminate()
    # print(f"Game Over, Winner is {winner}") <--- fix this

play_chess_game()