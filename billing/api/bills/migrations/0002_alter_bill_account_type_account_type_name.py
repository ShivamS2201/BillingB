# Generated by Django 4.1.7 on 2023-05-05 18:05

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("bills", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="bill_account_type",
            name="account_type_name",
            field=models.CharField(max_length=20),
        ),
    ]
