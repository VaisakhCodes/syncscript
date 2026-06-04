from django.urls import path
from . import views

urlpatterns = [
    path('analyze/', views.analyze_code, name='analyze_code'),
]
