
import { useEffect, useState } from "react";
import {
  BookOpen,
  LayoutDashboard,
  Star,
  Clock,
  Plus,
  X,
} from "lucide-react";

import { getNodes, createNode } from "../api/knowledge";
import { buildTree } from "../utils/buildTree";
import TreeNode from "./KnowledgeTree";

function Sidebar() {
  const [tree, setTree] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [nodeType, setNodeType] = useState("category");
  const [parent, setParent] = useState("");
  const [error, setError] = useState("");

  async function loadTree() {
    const data = await getNodes();
    setTree(buildTree(data));
  }

  useEffect(() => {
    loadTree().catch(console.error);
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setError("");

    try {
      await createNode({
        title: title.trim(),
        parent: parent || null,
        node_type: nodeType,
        position: 0,
        icon: "folder",
      });

      setTitle("");
      setParent("");
      setNodeType("category");
      setShowForm(false);

      await loadTree();
    } catch (err) {
      console.error(err);
      setError("Could not create item. Please check the information.");
    }
  }

  function renderParentOptions(nodes, level = 0) {
    return nodes.flatMap((node) => [
      <option key={node.id} value={node.id}>
        {"— ".repeat(level)}{node.title}
      </option>,
      ...renderParentOptions(node.children || [], level + 1),
    ]);
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <BookOpen size={25} />
        <h2>Knowledge Vault</h2>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-label">WORKSPACE</p>
        <a href="#" className="nav-item active">
          <LayoutDashboard size={18} /> Dashboard
        </a>
        <a href="#" className="nav-item">
          <Star size={18} /> Favorites
        </a>
        <a href="#" className="nav-item">
          <Clock size={18} /> Recently opened
        </a>
      </nav>

      <div className="knowledge-section">
        <div className="knowledge-heading">
          <p className="nav-label">MY KNOWLEDGE</p>
          <button
            type="button"
            title="Add knowledge"
            onClick={() => setShowForm(true)}
          >
            <Plus size={17} />
          </button>
        </div>

        {tree.map((node) => (
<TreeNode
  key={node.id}
  node={node}
  onAdd={(node, type) => {
    console.log("Add:", type, "inside:", node.title);
  }}
  onRename={(node) => {
    console.log("Rename:", node.title);
  }}
  onDelete={(node) => {
    console.log("Delete:", node.title);
  }}
/>        ))}
      </div>

      {showForm && (
        <div className="add-form-overlay">
          <form className="add-form" onSubmit={handleCreate}>
            <div className="add-form-heading">
              <h3>Add Knowledge</h3>
              <button
                type="button"
                onClick={() => setShowForm(false)}
              >
                <X size={18} />
              </button>
            </div>

            <label>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Frontend"
              required
            />

            <label>Type</label>
            <select
              value={nodeType}
              onChange={(e) => setNodeType(e.target.value)}
            >
              <option value="category">Category</option>
              <option value="topic">Topic</option>
              <option value="document">Document</option>
            </select>

            <label>Parent</label>
            <select
              value={parent}
              onChange={(e) => setParent(e.target.value)}
            >
              <option value="">No parent (main category)</option>
              {renderParentOptions(tree)}
            </select>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="save-button">
              Save Knowledge
            </button>
          </form>
        </div>
      )}

      <div className="sidebar-footer">
        Your personal learning space.
      </div>
    </aside>
  );
}

export default Sidebar;
