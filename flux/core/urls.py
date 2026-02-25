from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),

    path("signup/", views.signup, name="signup"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),

    path("cart/", views.cart, name="cart"),
    path("orders/", views.orders, name="orders"),
    path("profile/", views.profile, name="profile"),
    path("settings/", views.settings, name="settings"),
]