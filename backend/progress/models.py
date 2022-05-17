from django.db import models

# Create your models here.

class FileUploadModel(models.Model):
    file = models.FileField(upload_to='files/')


class ConvertFileModel(models.Model):
    file = models.ImageField(upload_to='converted_image/')
    converted_file = models.FileField(upload_to='converted_files/')
