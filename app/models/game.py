from app import db

class Game(db.Model): 
    game_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    opening = db.Column(db.String)
    fen = db.Column(db.String)
    game_status = db.Column(db.String, default="In Progress")
    user_move_list = db.Column(db.ARRAY(db.String()), default=[])
    engine_move_list = db.Column(db.ARRAY(db.String()), default=[])
    white = db.Column(db.String)
    user_move = db.Column(db.String, default="")
    

    def to_dict(self): 
        response = {
            "game_id" : self.game_id,
            "opening" : self.opening,
            "fen" : self.fen,
            "game_status": self.game_status,
            "user_move_list":self.user_move_list,
            "engine_move_list":self.engine_move_list
        }
        return response
    
    @classmethod
    def from_dict(cls, game_data): 
        return cls(
            opening=game_data["opening"],
            white=game_data["white"],
            fen=game_data["fen"],
            engine_move_list=game_data["engine_move_list"]
        )