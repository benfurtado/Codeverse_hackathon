from rest_framework import generics
from .models import Plant
from .serializers import PlantSerializer

class PlantList(generics.ListCreateAPIView):
    queryset = Plant.objects.all()
    serializer_class = PlantSerializer

class PlantDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Plant.objects.all()
    serializer_class = PlantSerializer


from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def send_variable(request):
    # Define the variable you want to send
    my_variable = "Hello from Django!"
    # Return the variable in the response
    return Response({'variable': my_variable})

@api_view(['GET'])
def second_page(request):

    hii = "second page"

    return Response({'hii': hii})

