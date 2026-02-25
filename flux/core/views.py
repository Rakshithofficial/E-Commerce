from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required

from .forms import CustomSignupForm


def home(request):
    return render(request, "home.html")


def signup(request):
    if request.method == "POST":
        form = CustomSignupForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("home")
        else:
            print("FORM ERRORS:", form.errors)  # DEBUG
    else:
        form = CustomSignupForm()

    return render(request, "signup.html", {"form": form})


def login_view(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect("home")
    else:
        form = AuthenticationForm()

    return render(request, "login.html", {"form": form})


def logout_view(request):
    logout(request)
    return redirect("home")


@login_required
def cart(request):
    return render(request, "cart.html")


@login_required
def orders(request):
    return render(request, "orders.html")


@login_required
def profile(request):
    return render(request, "profile.html")


@login_required
def settings(request):
    return render(request, "settings.html")