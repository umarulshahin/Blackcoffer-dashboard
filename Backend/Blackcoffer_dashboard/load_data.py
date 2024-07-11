import os
import json
import django
from datetime import datetime, date
from django.core.exceptions import ValidationError

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Blackcoffer_dashboard.settings')
django.setup()

from Dashboard.models import Dashboard  

file_path = os.path.join(os.path.dirname(__file__), 'data.json')

with open(file_path, 'r', encoding='utf-8') as file:
    data_list = json.load(file)

def parse_date(date_str):
    if not date_str or date_str.strip() == '':
        return None
    try:
        return datetime.strptime(date_str, '%Y-%m-%d').date()
    except ValueError:
        pass
    try:
        return datetime.strptime(date_str, '%Y').date()
    except ValueError:
        pass
    return None

def parse_datetime(datetime_str):
    if not datetime_str or datetime_str.strip() == '':
        return None
    try:
        return datetime.strptime(datetime_str, '%Y-%m-%dT%H:%M:%S')
    except ValueError:
        pass
    try:
        return datetime.strptime(datetime_str, '%B, %d %Y %H:%M:%S')
    except ValueError:
        pass
    return None

for data in data_list:
    end_year = parse_date(str(data.get('end_year')))
    start_year = parse_date(str(data.get('start_year')))
    added = parse_datetime(data.get('added'))
    published = parse_datetime(data.get('published'))

    try:
        obj={ end_year:end_year,
           " intensity":data.get('intensity'),
            "sector":data.get('sector'),
            "topic":data.get('topic'),
            "insight":data.get('insight'),
            "url":data.get('url'),
            "region":data.get('region'),
            "start_year":start_year,
            "impact":data.get('impact'),
           " added":added,
            "published":published,
            "country":data.get('country'),
            "relevance":data.get('relevance'),
           " pestle":data.get('pestle'),
           " source":data.get('source'),
            "title":data.get('title'),
            "likelihood":data.get('likelihood')
            
        }
        print(obj)
        instance = Dashboard(
            end_year=end_year,
            intensity=data.get('intensity'),
            sector=data.get('sector'),
            topic=data.get('topic'),
            insight=data.get('insight'),
            url=data.get('url'),
            region=data.get('region'),
            start_year=start_year,
            impact=data.get('impact'),
            added=added,
            published=published,
            country=data.get('country'),
            relevance=data.get('relevance'),
            pestle=data.get('pestle'),
            source=data.get('source'),
            title=data.get('title'),
            likelihood=data.get('likelihood')
        )
        instance.full_clean()  # Validate model fields before saving
        instance.save()
    except ValidationError as e:
        print(f"Validation Error: {e}")
    except Exception as e:
        print(f"Error saving instance: {e}")

print("Data loaded successfully.")
