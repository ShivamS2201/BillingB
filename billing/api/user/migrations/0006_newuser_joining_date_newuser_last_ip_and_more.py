# Generated by Django 4.1.7 on 2023-03-07 11:13

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0005_remove_newuser_last_ip"),
    ]

    operations = [
        migrations.AddField(
            model_name="newuser",
            name="joining_date",
            field=models.DateTimeField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="newuser",
            name="last_ip",
            field=models.GenericIPAddressField(default="192.168.0.1"),
        ),
        migrations.AddField(
            model_name="newuser",
            name="updated_at",
            field=models.DateTimeField(auto_now=True),
        ),
    ]
