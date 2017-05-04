from flask import Flask, jsonify, render_template
from subprocess import call
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
app.secret_key = 'mysecret'

socket_io = SocketIO(app)

# _mode = 'start' or 'stop'
_mode = 'stop'

@app.route('/')
def draw():
    return render_template('main.html')

# Changing Mode
@socket_io.on('change mode')
def changer(data):
    global _mode
    if data['mode'] == 'start':
        _mode = 'start'
    else:
        _mode = 'stop'

# Receiving Messages
@socket_io.on('my event')
def drawer(data):
    global _mode
    if _mode == 'stop':
        pass
    else:
        print('input data: ' + str(data))
        # send to webpage
        emit('draw', data, broadcast=True)

if __name__ == '__main__':
    socket_io.run(app, debug=True, host='localhost', port=8000)
    #socket_io.run(app, debug=True, host='0.0.0.0', port=80)