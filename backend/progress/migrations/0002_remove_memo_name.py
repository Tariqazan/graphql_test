# Generated by Django 3.2.13 on 2022-04-21 10:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('progress', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='memo',
            name='name',
        ),
    ]