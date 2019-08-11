from django.urls import path
from robot.views import index, login, error, grade, exam
from robot.apis import check, get

urlpatterns = [
    path('', index.index, name='Index'),
    path('error', error.error, name="Error"),
    path('error/404', error.e404, name="404"),
    path('error/403', error.e403, name="403"),
    path('error/400', error.e400, name="400"),
    path('error/500', error.e500, name="500"),

    path('action/login', login.login, name='Login'),
    path('action/grade', grade.get_grade, name='Grade'),
    path('action/exam', exam.get_exam, name='Exam'),

    path('api/check', check.check, name='Check'),
    path('api/check_cookies', check.check_cookies, name="CCookies"),
    path('api/grade', get.get_grade, name="GradeApi"),
    path('api/exam', get.get_exam, name="ExamApi")
]