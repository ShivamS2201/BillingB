# Generated by Django 4.1.7 on 2023-03-07 11:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="roles",
            name="id",
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
