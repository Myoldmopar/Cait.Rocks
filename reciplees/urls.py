from django.conf.urls import include, url
from django.http import HttpResponseRedirect
from django.contrib import admin
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='RecipLees API')

urlpatterns = [
    url(r'^admin/', admin.site.urls, name="admin"),
    url(r'^recipes/', include('recipes.urls')),
    url(r'^swagger/', schema_view),
    url(r'^$', lambda r: HttpResponseRedirect('recipes/')),
]
