default: install

install:
	sudo apt-get install python-pip python-dev
	sudo pip install -r requirements.txt

start:
	sudo python server.py
