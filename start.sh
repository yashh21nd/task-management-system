#!/bin/bash
# Start script for backend on Render

cd backend
exec gunicorn --bind 0.0.0.0:$PORT run:app