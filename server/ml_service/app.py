from flask import Flask, request, jsonify
import mysql.connector
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

app = Flask(__name__)

# Database Configuration
db_config = {
    'user': 'root',
    'host': 'localhost',
    'database': 'bookstore'
}

def get_data_from_db():
    try:
        conn = mysql.connector.connect(**db_config)
        # We fetch Title, Category, and Author Names
        query = """
            SELECT b.isbn, b.title, b.category, 
                   GROUP_CONCAT(a.name SEPARATOR ' ') as authors
            FROM books b
            LEFT JOIN bookauthors ba ON b.isbn = ba.isbn
            LEFT JOIN authors a ON ba.author_id = a.author_id
            GROUP BY b.isbn
        """
        df = pd.read_sql(query, conn)
        conn.close()
        return df
    except Exception as e:
        print(f"Error connecting to DB: {e}")
        return pd.DataFrame()

df_books = pd.DataFrame()
cosine_sim = None

def train_model():
    global df_books, cosine_sim
    print("Training Recommendation Model....")
    
    df_books = get_data_from_db()
    
    if df_books.empty:
        print("No data found in DB.")
        return

    df_books['content'] = (
        df_books['title'] + " " + 
        df_books['category'] + " " + 
        df_books['authors'].fillna('')
    )

    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(df_books['content'])

    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    
    print("Model Trained Successfully!")

train_model()

@app.route('/recommend', methods=['GET'])
def recommend():
    isbn = request.args.get('isbn')
    
    if isbn not in df_books['isbn'].values:
        return jsonify({"error": "Book not found or model outdated"}), 404

    idx = df_books.index[df_books['isbn'] == isbn][0]

    sim_scores = list(enumerate(cosine_sim[idx]))

    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    sim_scores = sim_scores[1:6]

    book_indices = [i[0] for i in sim_scores]
    recommended_isbns = df_books['isbn'].iloc[book_indices].tolist()

    return jsonify(recommended_isbns)

@app.route('/retrain', methods=['POST'])
def retrain():
    train_model()
    return jsonify({"message": "Model retrained successfully"})

if __name__ == '__main__':
    app.run(port=5000, debug=True)