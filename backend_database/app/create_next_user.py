import os

import django
from decouple import config  # Import config from python-decouple
from django.contrib.auth import get_user_model

# Set up Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "app.settings")
django.setup()

User = get_user_model()

# Retrieve values from environment variables or .env file
username = config("NEXT_USERNAME", cast=str)
password = config("NEXT_PASSWORD", cast=str)

if not User.objects.filter(username=username).exists():
    print(f"Creating user {username}...")
    User.objects.create_user(username=username, password=password)
else:
    print(f"User {username} already exists.")
