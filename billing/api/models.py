from django.db import models

# Create your models here.

class StateCode(models.Model):
    state_name = models.CharField(max_length=100)
    state_code = models.IntegerField(max_length=50) 
    status = models.BooleanField(default=True)
    def __str__(self):
        return f"{self.state_code}"