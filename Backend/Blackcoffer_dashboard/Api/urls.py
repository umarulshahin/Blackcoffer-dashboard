
from django.urls import path
from Dashboard.views import *

urlpatterns = [
    path('dashboard/',Dashboard_.as_view(),name='dashboard')
]
