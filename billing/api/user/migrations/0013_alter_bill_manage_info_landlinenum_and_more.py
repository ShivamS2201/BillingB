# Generated by Django 4.1.7 on 2023-04-03 20:35

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("user", "0012_bill_manage_info"),
    ]

    operations = [
        migrations.AlterField(
            model_name="bill_manage_info",
            name="landlineNUM",
            field=models.IntegerField(max_length=10),
        ),
        migrations.AlterField(
            model_name="bill_manage_info",
            name="sms_debit",
            field=models.IntegerField(default=0, max_length=1000),
        ),
        migrations.AlterField(
            model_name="bill_manage_info",
            name="system_debit",
            field=models.IntegerField(default=0, max_length=1000),
        ),
        migrations.AlterField(
            model_name="bill_manage_info",
            name="whatsapp_debit",
            field=models.IntegerField(default=0, max_length=1000),
        ),
    ]
