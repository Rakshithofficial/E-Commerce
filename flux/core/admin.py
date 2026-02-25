from django.contrib import admin

# Register your models here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Product


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User

    list_display = ("username", "email", "full_name", "is_vendor", "is_staff")
    list_filter = ("is_vendor", "is_staff")

    fieldsets = (
        (None, {"fields": ("username", "password")}),
        ("Personal info", {"fields": ("full_name", "email", "phone")}),
        ("Roles", {"fields": ("is_vendor",)}),
        ("Permissions", {"fields": ("is_staff", "is_superuser", "groups", "user_permissions")}),
    )


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "vendor", "price", "stock", "created_at")
    list_filter = ("vendor",)
    search_fields = ("name",)