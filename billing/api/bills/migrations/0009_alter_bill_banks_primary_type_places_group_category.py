# Generated by Django 4.1.7 on 2023-08-07 11:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("bills", "0008_bill_cash"),
    ]

    operations = [
        migrations.AlterField(
            model_name="bill_banks",
            name="Primary_type",
            field=models.BooleanField(default=True),
        ),
        migrations.CreateModel(
            name="Places",
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
                ("place_name", models.CharField(max_length=100, verbose_name="Places")),
                ("timeStamp", models.DateTimeField(auto_now_add=True)),
                ("status", models.BooleanField(default=True)),
                (
                    "master_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Group",
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
                ("cust_grp", models.CharField(max_length=100, verbose_name="Group")),
                ("timeStamp", models.DateTimeField(auto_now_add=True)),
                ("status", models.BooleanField(default=True)),
                (
                    "master_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Category",
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
                ("cat_name", models.CharField(max_length=100, verbose_name="Category")),
                ("timeStamp", models.DateTimeField(auto_now_add=True)),
                ("status", models.BooleanField(default=True)),
                (
                    "master_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
