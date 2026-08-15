from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

from expenses.views import ExpenseViewSet

router = routers.DefaultRouter()
router.register(r'expenses', ExpenseViewSet, basename='expense')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', obtain_auth_token, name='api-login'),
    path('api/', include(router.urls)),
]
