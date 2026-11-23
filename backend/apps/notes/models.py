from django.db import models
from apps.knowledge.models import KnowledgeNode
# Create your models here.
class NoteContent(models.Model):
    node=models.OneToOneField(
        KnowledgeNode,
        on_delete=models.CASCADE,
        related_name="note_content",
    )
    content=models.JSONField(
        default=dict,
        blank=True,
    )
    summary=models.TextField(blank=True, default="")
    last_read_at=models.DateTimeField(null=True, blank=True)
    is_favorite=models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Note: {self.node.title}"
