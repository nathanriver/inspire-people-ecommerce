build-api:
	cd server && docker build -t inspire-api .

build-dev: build-api
	cd client && make build-base

build-production: build-api
	cd client && make build-production

run-dev:
	docker-compose --file docker-compose-dev.yml up --remove-orphans

run-production:
	docker-compose --file docker-compose-production.yml up --remove-orphans

migrate-db:
	docker-compose --file docker-compose-dev.yml up --remove-orphans	

dump-db:
	docker exec -i inspire-people-ecommerce_db_1 bash \
	-c 'pg_dump --clean -U "$$POSTGRES_USER" "$$POSTGRES_DB"' > ./server/dump.sql

restore-db:
	docker exec -i inspire-people-ecommerce_db_1 bash \
	-c 'psql -U "$$POSTGRES_USER" "$$POSTGRES_DB"' < ./server/dump.sql