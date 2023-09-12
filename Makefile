build:
	docker compose build --no-cache

start:
	docker compose up -d app adminer

stop:
	docker compose down

sh:
	docker compose exec app sh

prisma-migrate:
	docker compose exec app sh -c "yarn prisma migrate dev"

build-dist:
	yarn run build

zip:
	sh zipper.sh
