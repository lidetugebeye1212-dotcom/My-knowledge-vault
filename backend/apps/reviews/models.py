
# Create your models here.
import uuid

from django.db import models
from django.utils import timezone

from apps.knowledge.models import KnowledgeNode


class ReviewRecord(models.Model):

    MEMORY_LEVELS = [
        ("forgotten", "Forgotten"),
        ("hard", "Hard"),
        ("good", "Good"),
        ("easy", "Easy"),
    ]

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    node = models.ForeignKey(
        KnowledgeNode,
        on_delete=models.CASCADE,
        related_name="reviews",
    )

    last_reviewed_at = models.DateTimeField(
        null=True,
        blank=True,
    )

    next_review_at = models.DateTimeField(
        default=timezone.now,
    )

    review_count = models.PositiveIntegerField(default=0)

    memory_level = models.CharField(
        max_length=20,
        choices=MEMORY_LEVELS,
        default="good",
    )

    is_completed = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["next_review_at"]

    def __str__(self):
        return f"Review: {self.node.title}"