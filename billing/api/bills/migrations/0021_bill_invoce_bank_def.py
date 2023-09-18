# Generated by Django 4.1.7 on 2023-09-18 09:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("bills", "0020_alter_bill_banks_gstnumber"),
    ]

    operations = [
        migrations.AddField(
            model_name="bill_invoce",
            name="bank_def",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                to="bills.bill_banks",
                verbose_name="Bank",
            ),
            preserve_default=False,
        ),
    ]