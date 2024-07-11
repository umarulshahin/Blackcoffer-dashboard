from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import DashboardSerializer
from .models import *
from django.db.models import *

# Create your views here.


class Dashboard_(APIView):
    
    def get(self,request):
        
        # intensity=Dashboard.objects.values('intensity').annotate(count=Count('intensity')).order_by('intensity')
        # likelihood=Dashboard.objects.values('likelihood').annotate(count=Count('likelihood')).order_by('likelihood')
        # relevance=Dashboard.objects.values('relevance').annotate(count=Count('relevance')).order_by('relevance')
        # Year=Dashboard.objects.values('start_year').annotate(count=Count('start_year')).order_by('start_year')
        # Country=Dashboard.objects.values('country').annotate(count=Count('country')).order_by('country')
        # Topics=Dashboard.objects.values('topic').annotate(count=Count('topic')).order_by('topic')
        # Region=Dashboard.objects.values('region').annotate(count=Count('region')).order_by('region')
        # Sector=Dashboard.objects.values('sector').annotate(count=Count('sector')).order_by('sector')
        
        # data={
        #     "intensity":intensity,
        #     "Likelihood":likelihood,
        #     "relevance":relevance,
        #     "start_year":Year,
        #     "country":Country,
        #     "topic":Topics,
        #     "region":Region,
        #     "sector":Sector
        # }
        
        data=Dashboard.objects.all()
        
        serializer=DashboardSerializer(data,many=True)
        return Response(serializer.data[0])
        
class filter(APIView):
    
    def get(self,request):
        
        data=request.data
        if data['filter']=='year':
            value=Dashboard.objects.filter(start_year='')
        return Response("Yes")
        
        
        


