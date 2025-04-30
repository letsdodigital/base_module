from rest_framework import serializers

from .models import UIUser


class UIUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UIUser
        fields = [
            "id",
            "first_name",
            "last_name",
            "username",
            "email",
            "is_active",
            "access",
            "created_at",
            "updated_at",
        ]
