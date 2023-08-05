from app import db

class Game(db.Model): 
    game_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    opening = db.Column(db.String)
    board_init = db.Column(db.PickleType)
    fen = db.Column(db.String)
    game_status = db.Column(db.String, default="In Progress")
    move_list = db.Column(db.ARRAY(db.String()), default=[])
    current_player = db.Column(db.String)
    user_move = db.Column(db.String, default="")

    def to_dict(self): 
        response = {
            "game_id" : self.game_id,
            "opening" : self.opening,
            "fen" : self.fen,
            "game_status": self.game_status,
            "current_player": self.current_player,
        }
        return response
    
    @classmethod
    def from_dict(cls, game_data): 
        return cls(
            opening=game_data["opening"],
            user_move=game_data["user_move"],
            current_player=game_data["current_player"]
        )