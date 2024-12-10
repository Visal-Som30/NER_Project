from flask import Flask, jsonify, request

# Initialize the Flask application
app = Flask(__name__)

# Define a route to return a simple message
@app.route('/')
def hello_world():
    return "Hello, World!"

# Define a route to return data in JSON format
@app.route('/api/data', methods=['GET'])
def get_data():
    data = {
        'message': 'This is a simple Flask API.',
        'status': 'success'
    }
    return jsonify(data)

# Define a route to handle POST requests
@app.route('/api/echo', methods=['POST'])
def echo_data():
    # Get data from the request body
    input_data = request.get_json()
    
    # Return the data as part of the response
    return jsonify({'received_data': input_data})

if __name__ == '__main__':
    app.run(debug=True)
