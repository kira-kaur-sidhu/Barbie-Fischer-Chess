from app import db

class Game(db.Model): 
    game_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    opening = db.Column(db.String)
    board_init = db.Column(db.PickleType)
    fen = db.Column(db.String)
    game_status = db.Column(db.String, default="In Progress")
    move_list = db.Column(db.ARRAY(db.String()), default=[])
    current_player = db.Column(db.String)

    def to_dict(self): 
        response_format = {
            "game_id" : self.game_id,
            "opening" : self.opening,
            "board_init" : self.board_init,
            "fen" : self.fen,
            "move_list" : self.move_list, 
            "game_status": self.game_status,
            "current_player": self.current_player
        }
        return response_format
    
    @classmethod
    def from_dict(cls, game_data): 
        return cls(
            openning=game_data["opening"],
            fen=game_data["fen"],
            move_list=game_data["move_list"],
            game_status=game_data["game_status"],
            current_player=game_data["current_player"]
        )