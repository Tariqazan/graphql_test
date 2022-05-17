import graphene
from graphene_file_upload.scalars import Upload

from celery import shared_task
from celery_progress.backend import ProgressRecorder
import time

from pathlib import Path
from PIL import Image

from .models import *
from graphene_django import DjangoObjectType,DjangoListField


class FileType(DjangoObjectType):
    class Meta:
        model = FileUploadModel
        fields = ['id','file']



class ConvertedPdfType(DjangoObjectType):
    class Meta:
        model = ConvertFileModel
        fields = ['id']


class Query(graphene.ObjectType):
    files = DjangoListField(FileType)

    def resolve_files(self,info):
        return FileUploadModel.objects.all()


class QueryConvertedPdf(graphene.ObjectType):
    converted_pdf_list = DjangoListField(ConvertedPdfType)

    def resolve_converted_pdf(self,info):
        return ConvertFileModel.objects.all()


@shared_task(bind=True)
def my_task(self, seconds):
    progress_recorder = ProgressRecorder(self)
    result = 0
    for i in range(seconds):
        time.sleep(1)
        result += i
        progress_recorder.set_progress(i + 1, seconds)
    return result


def upload_file(file):
    task = my_task(5)
    file = FileUploadModel.objects.create(file=file)
    return file


class FileUpload(graphene.Mutation):
    success = graphene.Field(FileType)
    class Arguments:
        file = Upload(required=True)


    def mutate(self, info, file, **kwargs):
        task = my_task(5)
        success = FileUploadModel(file=file)
        success.save()
        return FileUpload(success=success)


def convert_file(file):
    task = my_task(5)
    uploaded_file = ConvertFileModel.objects.create(file=file)
    image1 = Image.open(r'media/'+str(uploaded_file.file)+'')
    im1 = image1.convert('RGB')
    im1.save(r'media/converted_files/success_'+str(uploaded_file.id)+'.pdf')
    ConvertFileModel.objects.filter(id=uploaded_file.id).update(converted_file=im1)
    return file


class ConvertFile(graphene.Mutation):
    class Arguments:
        file = Upload(required=True)

    success = graphene.Boolean()

    def mutate(self, info, file, **kwargs):
        success = convert_file(file)
        return FileUpload(success=success)


class Mutation(graphene.ObjectType):
    file_upload = FileUpload.Field()
    file_convert = ConvertFile.Field()