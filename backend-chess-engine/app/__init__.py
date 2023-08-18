from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os
from dotenv import load_dotenv
import logging
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()
load_dotenv()

def create_app(test_config=None):
    app = Flask(__name__)
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    if test_config is None:
        # app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
        #     "SQLALCHEMY_DATABASE_URI")
        app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("RENDER_DATABASE_URI")

    else:
        app.config["TESTING"] = True
        app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
            "SQLALCHEMY_TEST_DATABASE_URI")
        
    from .models.game import Game

    # app.logger.setLevel(logging.DEBUG)
    # logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)


    # app.logger.info("Initializing db with flask app")
    #logging.info("Initializing db with the flask app")
    db.init_app(app)
    # app.logger.info("Dropping all tables")
    # with app.app_context():
    #     db.drop_all()
    #     app.logger.info("Creating all tables")
    #     db.create_all()
    #     app.logger.info(repr(db.metadata))

    # app.logger.info("Migrating db")
    #logging.info("Migrating db")
    migrate.init_app(app, db)
    
    app.logger.info("DB prep is done.")
    logging.info("DB preparation done.")


    from app.routes.game_routes import game_bp
    app.register_blueprint(game_bp)
    
    CORS(app)
    return app