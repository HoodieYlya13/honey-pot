.PHONY: start stop logs clean

# Start the application
start:
	@if ! [ -f .env ] || ! grep -Fq 'DATABASE_URL="postgresql://postgres:password@db:5432/honeypot"' .env; then \
		echo 'Creating .env with default DATABASE_URL...'; \
		echo 'DATABASE_URL="postgresql://postgres:password@db:5432/honeypot"' > .env; \
	fi
	docker compose build
	docker compose up -d
	@echo "Application started at http://localhost:80"

# Stop the application
stop:
	docker compose down

# View honeypot logs
logs:
	docker exec -it honey-pot-web-1 tail -f /app/logs/honeypot.log

# Clean up (remove volumes)
clean:
	docker compose down -v
