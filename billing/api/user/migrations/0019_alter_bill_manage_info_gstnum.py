# Generated by Django 4.1.7 on 2023-08-09 15:51

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("user", "0018_alter_newuser_role_id"),
    ]

    operations = [
        migrations.AlterField(
            model_name="bill_manage_info",
            name="gstNum",
            field=models.CharField(max_length=15),
        ),
    ]
