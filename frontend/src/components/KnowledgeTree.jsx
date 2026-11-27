
import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FileText,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

function TreeNode({
  node,
  level = 0,
  onAdd,
  onRename,
  onDelete,
}) {
  const [expanded, setExpanded] = useState(true);
  const [menu, setMenu] = useState(false);

  const hasChildren = node.children?.length > 0;

  function handleContextMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    setMenu(true);
  }

  function handleAction(action) {
    setMenu(false);

    if (action === "category") onAdd(node, "category");
    if (action === "topic") onAdd(node, "topic");
    if (action === "document") onAdd(node, "document");
    if (action === "rename") onRename(node);
    if (action === "delete") onDelete(node);
  }

  return (
    <div>
      <div
        className="tree-node"
        style={{ paddingLeft: `${level * 18}px` }}
        onClick={() => {
          setMenu(false);
          if (hasChildren) setExpanded(!expanded);
        }}
        onContextMenu={handleContextMenu}
      >
        {hasChildren ? (
          expanded ? (
            <ChevronDown size={15} />
          ) : (
            <ChevronRight size={15} />
          )
        ) : (
          <span className="tree-spacer" />
        )}

        {node.node_type === "document" ? (
          <FileText size={17} />
        ) : (
          <Folder size={17} />
        )}

        <span>{node.title}</span>
      </div>

      {menu && (
        <div
          className="tree-context-menu"
          style={{ marginLeft: `${level * 18 + 25}px` }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={() => handleAction("category")}>
            <Plus size={15} /> Add subcategory
          </button>

          <button onClick={() => handleAction("topic")}>
            <Plus size={15} /> Add topic
          </button>

          <button onClick={() => handleAction("document")}>
            <FileText size={15} /> Add document
          </button>

          <hr />

          <button onClick={() => handleAction("rename")}>
            <Pencil size={15} /> Rename
          </button>

          <button
            className="delete-action"
            onClick={() => handleAction("delete")}
          >
            <Trash2 size={15} /> Delete
          </button>

          <button onClick={() => setMenu(false)}>
            Cancel
          </button>
        </div>
      )}

      {expanded && hasChildren && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onAdd={onAdd}
              onRename={onRename}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TreeNode;
