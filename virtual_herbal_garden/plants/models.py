# plants/models.py
from django.db import models

class Plant(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    # Add other fields as needed

    def __str__(self):
        return self.name
