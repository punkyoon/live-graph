import time
from random import randrange
from socketIO_client import SocketIO, LoggingNamespace

'''
Sending data format:
    data= {
        'e': value,
        'walk': value,
        'fast_walk': value,
        'walk_time': value,
        'fast_walk_time': value,
        'rest_time': value,
    }
'''

if __name__ == '__main__':
    with SocketIO('localhost', 8000, LoggingNamespace) as socketIO:
        while True:
            # Data for testing
            send_data = {
                'e': randrange(10),
                'walk': randrange(50),
                'fast_walk': randrange(50),
                'walk_time': randrange(50),
                'fast_walk_time': randrange(50),
                'rest_time': randrange(50),
            }

            # Send
            socketIO.emit('my event', send_data)
            time.sleep(0.5)
