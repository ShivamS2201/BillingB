# Generated by Django 4.1.7 on 2023-08-09 15:50

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0004_register_dealer"),
    ]

    operations = [
        migrations.RenameField(
            model_name="register_dealer",
            old_name="customer",
            new_name="customer_Bool",
        ),
    ]
