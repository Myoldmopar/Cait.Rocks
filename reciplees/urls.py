from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    # ex: /recipes
    url(r'^recipes/', include('recipes.urls')),
]
