default: install

install:
	apt install python-pip python-dev
	pip install -r requirements.txt

start:
	sudo python server.py
