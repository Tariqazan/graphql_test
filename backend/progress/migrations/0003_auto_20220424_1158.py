# Generated by Django 3.2.13 on 2022-04-24 05:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('progress', '0002_remove_memo_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='memo',
            name='file',
        ),
        migrations.AddField(
            model_name='memo',
            name='image',
            field=models.ImageField(default=1, upload_to='memo/'),
            preserve_default=False,
        ),
    ]
