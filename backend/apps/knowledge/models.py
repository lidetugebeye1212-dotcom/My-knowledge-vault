# backend/apps/knowledge/models.py

import uuid

from django.db import models


class KnowledgeNode(models.Model):

    NODE_TYPES = [
        ("category", "Category"),
        ("topic", "Topic"),
        ("document", "Document"),
    ]

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    title = models.CharField(max_length=255)

    parent = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="children",
    )

    node_type = models.CharField(
        max_length=20,
        choices=NODE_TYPES,
        default="topic",
    )

    position = models.PositiveIntegerField(default=0)

    icon = models.CharField(
        max_length=50,
        blank=True,
        default="folder",
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["position", "title"]

    def __str__(self):
        return self.title