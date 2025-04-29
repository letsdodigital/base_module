# Use the official Python image
FROM python:3.13-alpine

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /app

# Install system dependencies for Python and psycopg2
RUN apk add --no-cache gcc musl-dev libpq-dev

# Install Poetry
RUN pip install --no-cache-dir poetry poetry-plugin-shell

# Copy the Poetry files
COPY pyproject.toml poetry.lock /app/

# Install dependencies
RUN poetry install --no-root

# Copy the project files
COPY . /app/

# Expose the port
EXPOSE 8000

# Run the Django development server
CMD ["poetry", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]