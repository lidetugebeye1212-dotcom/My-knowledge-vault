from rest_framework.routers import DefaultRouter

from .views import KnowledgeNodeViewSet


router = DefaultRouter()

router.register(
    "nodes",
    KnowledgeNodeViewSet,
    basename="node",
)

urlpatterns = router.urls