# Generated by Django 4.2.6 on 2024-06-18 17:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Dashboard', '0002_alter_dashboard_end_year_alter_dashboard_insight_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dashboard',
            name='title',
            field=models.CharField(blank=True, null=True),
        ),
    ]