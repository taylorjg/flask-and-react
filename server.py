from flask import Flask, request

app = Flask(__name__)


@app.route('/reverse', methods=['POST'])
def form_example():
    input = request.form.get('input')
    print(f"input: {input}")
    output = input[::-1]
    print(f"output: {output}")
    return output
