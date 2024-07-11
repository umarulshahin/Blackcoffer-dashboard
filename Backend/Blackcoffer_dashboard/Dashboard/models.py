from django.db import models

# Create your models here.


class Dashboard(models.Model):
    
    end_year=models.DateField(null=True,blank=True)
    intensity=models.IntegerField(blank=True)
    sector=models.CharField(max_length=250,blank=True,null=True)
    topic=models.CharField(max_length=100,blank=True,null=True)
    insight=models.CharField(max_length=250,blank=True,null=True)
    url=models.URLField(max_length=250,blank=True,null=True)
    region=models.CharField(max_length=150,blank=True,null=True)
    start_year=models.DateField(null=True,blank=True)
    impact=models.CharField(max_length=150,blank=True,null=True)
    added=models.DateTimeField(null=True,blank=True)
    published=models.DateField(null=True,blank=True)
    country=models.CharField(max_length=150,blank=True,null=True)
    relevance=models.IntegerField(blank=True,null=True)
    pestle=models.CharField(max_length=150,blank=True,null=True)
    source=models.CharField(max_length=150,blank=True,null=True)
    title=models.CharField(blank=True,null=True)
    likelihood=models.IntegerField(blank=True,null=True)

    