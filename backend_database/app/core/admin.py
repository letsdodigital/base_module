from django import forms
from django.contrib import admin
from django.contrib.auth.hashers import make_password

from .models import UIUser


class UIUserAdminForm(forms.ModelForm):
    password = forms.CharField(
        required=False,
        widget=forms.PasswordInput(
            render_value=True
        ),  # Use PasswordInput to obscure the field
        help_text="Password has been obscured for security. Enter a new password to update.",
    )

    class Meta:
        model = UIUser
        fields = "__all__"

    def clean_password(self):
        """Hash the password if it is being updated."""
        password = self.cleaned_data["password"]
        if password:  # If a new password is provided
            return make_password(password)
        else:
            # If no new password is provided, keep the existing one
            return self.instance.password


@admin.register(UIUser)
class UIUserAdmin(admin.ModelAdmin):
    form = UIUserAdminForm  # Use the custom form
    fields = [
        "first_name",
        "last_name",
        "username",
        "email",
        "password",
        "is_active",
        "access",
        "created_at",
        "updated_at",
    ]
    readonly_fields = ("created_at", "updated_at")
    list_display = (
        "first_name",
        "last_name",
        "username",
        "email",
        "is_active",
        "access",
    )
    search_fields = ("username", "email", "first_name", "last_name")
    list_filter = ("access", "is_active")

    def obscured_password(self, obj):
        """
        Show only the first 6 characters of the password and obscure the rest.
        """
        return f"{obj.password[:6]}{'*' * (len(obj.password) - 6)}"

    obscured_password.short_description = "Password"
