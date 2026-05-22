from flask import Flask, request, jsonify
from flask_cors import CORS
import gspread
from oauth2client.service_account import ServiceAccountCredentials

app = Flask(__name__)
CORS(app)

# Google Sheets setup
scope = [
    "https://spreadsheets.google.com/feeds",
    "https://www.googleapis.com/auth/drive"
]

creds = ServiceAccountCredentials.from_json_keyfile_name(
    "service_account.json",
    scope
)

client = gspread.authorize(creds)

# Mở Google Sheet
sheet = client.open_by_key("1l8T_xs-mmCmNy_p4BArR0WzlkRt85drj-yHkqdG5mws").sheet1


@app.route('/search')
def search_data():
    keyword = request.args.get('q', '').lower()

    data = sheet.get_all_records()

    results = []

    for row in data:
        if any(keyword in str(value).lower() for value in row.values()):
            results.append(row)

    return jsonify(results)


import os

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)