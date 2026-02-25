from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model

User = get_user_model()


class CustomSignupForm(UserCreationForm):
    full_name = forms.CharField(
        label="Full name",
        max_length=150,
        widget=forms.TextInput(attrs={
            "placeholder": "Enter your full name",
            "class": "input-field",
            "autocomplete": "name"
        })
    )

    username = forms.CharField(
        widget=forms.TextInput(attrs={
            "placeholder": "Choose a username",
            "class": "input-field",
            "autocomplete": "username"
        })
    )

    email = forms.EmailField(
        widget=forms.EmailInput(attrs={
            "placeholder": "Enter your email address",
            "class": "input-field",
            "autocomplete": "email"
        })
    )

    phone = forms.CharField(
        required=False,
        widget=forms.TextInput(attrs={
            "placeholder": "Phone number (optional)",
            "class": "input-field",
            "autocomplete": "tel"
        })
    )

    password1 = forms.CharField(
        label="Password",
        widget=forms.PasswordInput(attrs={
            "placeholder": "Create a password",
            "class": "input-field",
            "autocomplete": "new-password"
        })
    )

    password2 = forms.CharField(
        label="Confirm password",
        widget=forms.PasswordInput(attrs={
            "placeholder": "Re-enter your password",
            "class": "input-field",
            "autocomplete": "new-password"
        })
    )

    class Meta:
        model = User
        fields = (
            "full_name",
            "username",
            "email",
            "phone",
            "password1",
            "password2",
        )

    # 🔥 THIS IS THE MISSING PIECE
    def save(self, commit=True):
        user = super().save(commit=False)

        # Map form fields to user model fields
        user.username = self.cleaned_data["username"]
        user.email = self.cleaned_data["email"]

        # Handle full name safely
        full_name = self.cleaned_data.get("full_name", "").strip()
        if full_name:
            parts = full_name.split(" ", 1)
            user.first_name = parts[0]
            user.last_name = parts[1] if len(parts) > 1 else ""

        # Optional phone field (only if your User model has it)
        if hasattr(user, "phone"):
            user.phone = self.cleaned_data.get("phone")

        if commit:
            user.save()

        return user