from rest_framework.viewsets import ModelViewSet

from .models import UIUser
from .serializers import UIUserSerializer


class UIUserViewSet(ModelViewSet):
    queryset = UIUser.objects.all()
    serializer_class = UIUserSerializer
