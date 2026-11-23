from django.db import models
from apps.knowledge.models import KnowledgeNode


class Resource(models.Model):

    RESOURCE_TYPES = [
        ("website", "Website"),
        ("article", "Article"),
        ("video", "Video"),
        ("documentation", "Documentation"),
        ("github", "GitHub"),
        ("book", "Book"),
        ("other", "Other"),
    ]

    node = models.ForeignKey(
        KnowledgeNode,
        on_delete=models.CASCADE,
        related_name="resources",
    )

    title = models.CharField(max_length=255)

    url = models.URLField()

    resource_type = models.CharField(
        max_length=20,
        choices=RESOURCE_TYPES,
        default="website",
    )

    description = models.TextField(blank=True, default="")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title