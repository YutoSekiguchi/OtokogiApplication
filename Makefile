# 開発環境用コマンド
start-dev:
	docker-compose up --build -d
start-dev-backend:
	docker-compose up -d mysql phpmyadmin api
down-dev:
	docker-compose down --rmi all

# 本番環境用のコマンド
start-prod:
	sudo chmod -R 777 db && docker-compose up --build -d --remove-orphans

start-client:
	docker-compose up --build -d --remove-orphans client

down-prod:
	docker-compose down --rmi all