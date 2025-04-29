from django.contrib.auth.hashers import make_password
from django.db import models


class UIUser(models.Model):
    ACCESS_LEVEL_CHOICES = [
        ("admin", "Admin"),
        ("editor", "Editor"),
        ("viewer", "Viewer"),
    ]

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # Add a password field
    is_active = models.BooleanField(default=True)
    access = models.CharField(
        max_length=10, choices=ACCESS_LEVEL_CHOICES, default="viewer"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if self.password and not self.password.startswith("pbkdf2_"):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        verbose_name = "UI user"
        verbose_name_plural = "UI users"
