# Generated by Django 4.1.7 on 2023-05-05 17:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("user", "0016_alter_newuser_is_active"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Bill_Account_type",
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
                ("account_type_name", models.CharField(max_length=10)),
                ("date_time", models.DateTimeField(auto_now=True)),
                ("status", models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name="Bill_banks",
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
                ("created_at", models.DateField(auto_created=True)),
                (
                    "bank_name",
                    models.CharField(max_length=100, verbose_name="Bank_name"),
                ),
                (
                    "account_num",
                    models.IntegerField(max_length=50, verbose_name="Account Number"),
                ),
                ("ifsc_code", models.CharField(max_length=20)),
                ("Branch", models.CharField(max_length=20)),
                ("open_balance", models.IntegerField(max_length=5)),
                ("Primary_type", models.BooleanField()),
                ("modify_date", models.DateTimeField(auto_now=True)),
                (
                    "account_type",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="bills.bill_account_type",
                    ),
                ),
                (
                    "gstNumber",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="user.bill_manage_info",
                    ),
                ),
                (
                    "user_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
