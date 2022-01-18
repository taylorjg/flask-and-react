from flask import Flask, request

app = Flask(__name__, static_url_path='')


@app.route('/', methods=['GET'])
def index():
    return app.send_static_file('index.html')


@app.route('/reverse', methods=['POST'])
def form_example():
    input = request.form.get('input')
    print(f"input: {input}")
    output = input[::-1]
    print(f"output: {output}")
    return output
