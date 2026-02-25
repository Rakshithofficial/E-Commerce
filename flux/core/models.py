from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    full_name = models.CharField(max_length=150)
    phone = models.CharField(max_length=15, blank=True)
    email = models.EmailField(unique=True)

    # Role flag
    is_vendor = models.BooleanField(default=False)

    def __str__(self):
        return self.username


class Product(models.Model):
    vendor = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        limit_choices_to={"is_vendor": True},
        related_name="products"
    )

    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name