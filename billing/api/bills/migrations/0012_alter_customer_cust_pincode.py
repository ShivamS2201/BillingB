# Generated by Django 4.1.7 on 2023-08-09 16:56

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("bills", "0011_rename_image_customer_image_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="customer",
            name="cust_pincode",
            field=models.IntegerField(max_length=6),
        ),
    ]
