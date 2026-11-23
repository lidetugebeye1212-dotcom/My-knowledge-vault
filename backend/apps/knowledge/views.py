from rest_framework import viewsets

from .models import KnowledgeNode
from .serializers import KnowledgeNodeSerializer


class KnowledgeNodeViewSet(viewsets.ModelViewSet):
    queryset = KnowledgeNode.objects.all()
    serializer_class = KnowledgeNodeSerializer