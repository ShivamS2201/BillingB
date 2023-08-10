# Generated by Django 4.1.7 on 2023-08-09 15:38

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0003_currency_export"),
    ]

    operations = [
        migrations.CreateModel(
            name="Register_dealer",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("dealer_name", models.CharField(max_length=90)),
                ("datetime", models.DateTimeField(auto_now_add=True)),
                ("customer", models.BooleanField(default=True)),
                ("status", models.BooleanField(default=True)),
            ],
        ),
    ]
