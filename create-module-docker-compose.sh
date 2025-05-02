#!/bin/bash

# File to generate
OUTPUT_FILE="docker-compose-module.yml"

# Start the module extension file
cat <<EOL > $OUTPUT_FILE
version: '3.8'

services:
  backend-database:
    extends:
      service: backend-database
      file: docker-compose-base-dev.yml
    volumes:
EOL

# Add backend volumes for internal modules
for module in ./modules/internal/*; do
  if [ -d "$module/backend" ]; then
    echo "      - $module/backend:/app/modules/internal/$(basename "$module")/backend" >> $OUTPUT_FILE
  fi
done

# Add backend volumes for external modules
for module in ./modules/external/*; do
  if [ -d "$module/backend" ]; then
    echo "      - $module/backend:/app/modules/external/$(basename "$module")/backend" >> $OUTPUT_FILE
  fi
done

# Add frontend service
cat <<EOL >> $OUTPUT_FILE

  frontend:
    extends:
      service: frontend
      file: docker-compose-base-dev.yml
    volumes:
EOL

# Add frontend volumes for internal modules
for module in ./modules/internal/*; do
  if [ -d "$module/frontend" ]; then
    echo "      - $module/frontend:/app/modules/internal/$(basename "$module")/frontend" >> $OUTPUT_FILE
  fi
done

# Add frontend volumes for external modules
for module in ./modules/external/*; do
  if [ -d "$module/frontend" ]; then
    echo "      - $module/frontend:/app/modules/external/$(basename "$module")/frontend" >> $OUTPUT_FILE
  fi
done

echo "Docker Compose module file '$OUTPUT_FILE' created successfully."