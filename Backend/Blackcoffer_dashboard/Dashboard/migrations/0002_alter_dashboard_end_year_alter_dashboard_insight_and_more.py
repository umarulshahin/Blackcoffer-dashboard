# Generated by Django 4.2.6 on 2024-06-18 11:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Dashboard', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dashboard',
            name='end_year',
            field=models.DateField(default=None, null=True),
        ),
        migrations.AlterField(
            model_name='dashboard',
            name='insight',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='dashboard',
            name='sector',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='dashboard',
            name='start_year',
            field=models.DateField(default=None, null=True),
        ),
        migrations.AlterField(
            model_name='dashboard',
            name='topic',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
