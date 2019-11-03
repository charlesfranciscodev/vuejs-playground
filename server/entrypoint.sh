#!/bin/sh

echo "Waiting for database..."

while ! nc -z database 5432; do
  sleep 0.1
done

echo "Database started"

python manage.py run -h 0.0.0.0
