# Generated by Django 3.2.13 on 2022-04-25 07:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('progress', '0006_auto_20220425_1302'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='convertfilemodel',
            name='uploaded_file',
        ),
        migrations.AlterField(
            model_name='convertfilemodel',
            name='file',
            field=models.FileField(default=1, upload_to='converted_files/'),
            preserve_default=False,
        ),
    ]