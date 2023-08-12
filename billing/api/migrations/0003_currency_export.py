# Generated by Django 4.1.7 on 2023-08-09 14:54

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0002_alter_statecodes_state_name"),
    ]

    operations = [
        migrations.CreateModel(
            name="Currency",
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
                ("name", models.CharField(max_length=90)),
                ("type_C", models.CharField(max_length=50)),
                ("datetime", models.DateTimeField(auto_now_add=True)),
                ("status", models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name="Export",
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
                ("name", models.CharField(max_length=90)),
                ("datetime", models.DateTimeField(auto_now_add=True)),
                ("status", models.BooleanField(default=True)),
            ],
        ),
    ]