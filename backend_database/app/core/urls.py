from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import UIUserViewSet

# Create a router and register the UIUserViewSet
router = DefaultRouter()
router.register(r"uiusers", UIUserViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
