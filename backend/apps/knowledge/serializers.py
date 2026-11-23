from rest_framework import serializers

from .models import KnowledgeNode


class KnowledgeNodeSerializer(serializers.ModelSerializer):

    class Meta:
        model = KnowledgeNode

        fields = [
            "id",
            "title",
            "parent",
            "node_type",
            "position",
            "icon",
            "created_at",
            "updated_at",
            # "__all__"   

        ]

        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]