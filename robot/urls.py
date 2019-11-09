from django.urls import path, include
from robot.views.Public import index, error
from robot.sub_urls import ax_urls, ch_urls

urlpatterns = [
    path('', index.index, name='Index'),
    path('error', error.error, name="Error"),
    path('error/404', error.e404, name="404"),
    path('error/403', error.e403, name="403"),
    path('error/400', error.e400, name="400"),
    path('error/500', error.e500, name="500"),

    path('ax/', include(ax_urls)),
    path('ch/', include(ch_urls))
]
