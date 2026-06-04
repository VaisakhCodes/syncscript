#!/usr/bin/env bash
# exit on error
set -o errexit

# Go to the frontend directory
cd ../frontend

# Install dependencies and build
npm install
npm run build

# Return to the backend directory
cd "../Django project"

# Install Python dependencies
pip install -r requirements.txt

# Collect static files into Django
python manage.py collectstatic --no-input
