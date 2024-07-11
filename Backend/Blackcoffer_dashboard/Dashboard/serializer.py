from rest_framework import serializers
from django.db.models import Count
from .models import Dashboard

class DashboardSerializer(serializers.ModelSerializer):
    intensity_count = serializers.SerializerMethodField()
    likelihood_count = serializers.SerializerMethodField()
    relevance_count = serializers.SerializerMethodField()
    year_count = serializers.SerializerMethodField()
    country_count = serializers.SerializerMethodField()
    topic_count = serializers.SerializerMethodField()
    region_count = serializers.SerializerMethodField()

    class Meta:
        model = Dashboard
        fields = '__all__'

    def get_intensity_count(self, instance):
        return list(Dashboard.objects.values('intensity','likelihood').annotate(count=Count('intensity')).order_by('intensity'))

    def get_likelihood_count(self, instance):
        return list(Dashboard.objects.values('likelihood').annotate(count=Count('likelihood')).order_by('likelihood'))

    def get_relevance_count(self, instance):
        return list(Dashboard.objects.values('relevance').annotate(count=Count('relevance')).order_by('relevance'))

    def get_year_count(self, instance):
        return list(Dashboard.objects.filter(start_year__isnull=False).values('start_year','intensity').annotate(count=Count('start_year')).order_by('start_year','intensity'))

    def get_country_count(self, instance):
        return list(Dashboard.objects.values('country').annotate(count=Count('country')).order_by('country'))

    def get_topic_count(self, instance):
        return list(Dashboard.objects.values('topic').annotate(count=Count('topic')).order_by('topic'))

    def get_region_count(self, instance):
        return list(Dashboard.objects.values('region').annotate(count=Count('region')).order_by('region'))

