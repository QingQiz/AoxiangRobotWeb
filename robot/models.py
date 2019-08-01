from django.db import models


class ExamInfo(models.Model):
    indent_number = models.CharField(max_length=8)
    exam = []
    grade = []

    def __str__(self):
        return str({'id': self.indent_number, 'exam': self.exam, 'grade': self.grade})


