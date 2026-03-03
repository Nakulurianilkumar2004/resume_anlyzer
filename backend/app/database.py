from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Fetch variables (UPPERCASE)
USER = os.getenv("DB_USER")
PASSWORD = os.getenv("DB_PASSWORD")
HOST = os.getenv("DB_HOST")
PORT = os.getenv("DB_PORT")
DBNAME = os.getenv("DB_NAME")

# Construct SQLAlchemy connection string
DATABASE_URL = (
    f"postgresql+psycopg2://{USER}:{PASSWORD}"
    f"@{HOST}:{PORT}/{DBNAME}?sslmode=require"
)

# Create Engine
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,   # Checks connection before using
    pool_recycle=300      # Prevents stale connections
)

# Create Session
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base class for models
Base = declarative_base()


# FastAPI Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Optional: Test connection directly
if __name__ == "__main__":
    try:
        with engine.connect() as connection:
            print("✅ Connection successful!")
    except Exception as e:
        print(f"❌ Failed to connect: {e}")