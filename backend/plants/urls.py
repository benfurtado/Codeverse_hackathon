from django.urls import path
from . import views

urlpatterns = [
    path('api/plants/', views.PlantList.as_view(), name='plant-list'),
    path('api/plants/<int:pk>/', views.PlantDetail.as_view(), name='plant-detail'),
    path('api/send_variable/', views.send_variable, name='send_variable'),
    path('api/second_page/', views.second_page, name='second_page'),
]
