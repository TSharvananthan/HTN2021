
from app.factory import create_flask

app = create_flask()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")