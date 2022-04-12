from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from base.views import *

from django.urls import path, include, re_path
from django.views.generic import TemplateView



urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),
    path('api/products/', include('base.urls.product_urls')),
    path('api/users/', include('base.urls.user_urls')),
    path('api/orders/', include('base.urls.order_urls')),

    #Djoser
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
#urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name="index.html"))]