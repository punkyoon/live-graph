#import time
from socketIO_client import SocketIO, LoggingNamespace

'''
sending data format:
    data= {
        'e': value,
        'walk': value,
        'fast_walk': value,
        'walk_time': value,
        'fast_walk_time': value,
        'rest_time': value,
    }
'''

while True:
    with SocketIO('13.78.90.3', 80, LoggingNamespace) as socketIO:
        # test data set
        data = {
            'e': 50,
            'walk': 20,
            'fast_walk': 30,
            'walk_time': 20,
            'fast_walk_time': 40,
            'rest_time': 10,
        }

        # sending data set
        socketIO.emit('my event', data)
        #time.sleep(5)
