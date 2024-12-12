import pickle
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import PyPDF2
import io

# Initialize Flask app
app = Flask(
    __name__,
    template_folder='../interface',  # Point to the HTML folder
    static_folder='../interface'    # Point to the folder with JS and CSS
)
CORS(app)


# Load your trained model
model_path = '../models/trained_models/crf_model.pkl'
with open(model_path, 'rb') as model_file:
    model = pickle.load(model_file)

# Stop words (can customize based on your dataset)
stop_words = set([
    'the', 'and', 'in', 'to', 'of', 'we', 'that', 'is', 'on', 'for', 'with', 'as', 'at', 'from', 'a'
])

def create_features(data):
    """Generate features for each token."""
    features = []
    for word, _, token_length in data:
        word_features = {
            'word': word,
            'length': token_length,
            'is_alpha': word.isalpha(),
            'is_stop': word.lower() in stop_words,
            'has_digit': any(char.isdigit() for char in word)
        }
        features.append(word_features)
    return features

@app.route('/extract-text', methods=['POST'])
def extract_text():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected for uploading'}), 400

    try:
        # Read the PDF file
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(file.read()))
        text = ''
        for page in pdf_reader.pages:
            text += page.extract_text()

        text = text.replace('\n', '')
        
        return jsonify({'text': text}), 200
    except Exception as e:
        return jsonify({'error': f'Error extracting text: {str(e)}'}), 500

@app.route('/predict', methods=['POST'])
def predict():
    """API route to handle predictions."""
    try:
        # Parse request data
        data = request.get_json()
        if not data or 'text' not in data:
            return jsonify({"error": "No text provided"}), 400

        text = data['text']
        if not text.strip():
            return jsonify({"error": "Text is empty"}), 400

        # Preprocess and predict
        test_sentence = text.split(" ")
        test_features = create_features([(word, '', len(word)) for word in test_sentence])
        predictions = model.predict([test_features])[0]

        # Map tokens to their predicted labels
        result = [{'word': word, 'label': label} for word, label in zip(test_sentence, predictions)]

        return jsonify({'prediction': result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/')
def index():
    # Render the index.html file from the interface folder
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
