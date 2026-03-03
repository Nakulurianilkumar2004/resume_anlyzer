import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DATABASE_URL = (
        f"postgresql+psycopg2://"
        f"{os.getenv('user')}:"
        f"{os.getenv('password')}@"
        f"{os.getenv('host')}:"
        f"{os.getenv('port')}/"
        f"{os.getenv('dbname')}?sslmode=require"
    )

    SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    ALGORITHM = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES = 15
    REFRESH_TOKEN_EXPIRE_DAYS = 7


settings = Settings()