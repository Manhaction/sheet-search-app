from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

SHEET_URL = "https://docs.google.com/spreadsheets/d/1l8T_xs-mmCmNy_p4BArR0WzlkRt85drj-yHkqdG5mws/export?format=csv"

@app.route('/search')
def search_data():

    keyword = request.args.get('q', '').lower()

    df = pd.read_csv(SHEET_URL)

    results = []

    for _, row in df.iterrows():

        row_dict = row.fillna("").to_dict()

        if any(keyword in str(value).lower() for value in row_dict.values()):
            results.append(row_dict)

    return jsonify(results)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)