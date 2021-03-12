from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route('/api/v1/loans/', methods=['POST'])
def create_loan():
    args = request.get_json(force=True)

    if args.get('tax_id') is None:
        return jsonify({'message': 'Bad request'}), 400

    if args.get('business_name') is None:
        return jsonify({'message': 'Bad request'}), 400

    if args.get('requested_amount') is None:
        return jsonify({'message': 'Bad request'}), 400

    if float(args['requested_amount']) > 50000:
        response =  {'message': 'Declined'}
    elif float(args['requested_amount']) == 50000:
        response =  {'message': 'Undecided'}
    else:
        response =  {'message': 'Approved'}

    return jsonify(response)
    
if __name__ == "__main__":
    app.run(debug=False)