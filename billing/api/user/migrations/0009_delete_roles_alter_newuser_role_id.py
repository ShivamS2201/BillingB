# Generated by Django 4.1.7 on 2023-03-07 11:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0008_alter_roles_role_name"),
    ]

    operations = [
        migrations.DeleteModel(name="Roles",),
        migrations.AlterField(
            model_name="newuser",
            name="role_id",
            field=models.CharField(
                choices=[
                    ("SUPERUSER", "Superuser"),
                    ("OWNER", "Owner"),
                    ("DISTRIBUTOR", "Distributor"),
                    ("SALES", "Sales"),
                    ("HEAD_OFFICE", "Head Office"),
                    ("CUSTOMER", "Customer"),
                    ("USER", "User"),
                ],
                max_length=50,
            ),
        ),
    ]
