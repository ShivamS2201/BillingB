# Generated by Django 4.1.7 on 2023-08-10 15:31

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("bills", "0014_remove_customer_cust_pan"),
    ]

    operations = [
        migrations.AddField(
            model_name="customer",
            name="cust_pan",
            field=models.CharField(default=1234567891, max_length=10),
            preserve_default=False,
        ),
    ]
