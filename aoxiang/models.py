from django.db import models
import json


class Grade(models.Model):
    uid = models.CharField(max_length=32)
    term = models.IntegerField()
    data = models.TextField(default='')
    last_modify_time = models.DateTimeField(auto_now=True)

    def set_data(self, obj):
        self.data = json.dumps(obj, ensure_ascii=False)

