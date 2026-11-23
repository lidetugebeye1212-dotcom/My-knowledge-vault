import { useEffect, useState } from "react";
import { getNodes } from "../api/knowledge";

function NodeTest() {
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const data = await getNodes();
        setNodes(data);
      } catch (err) {
        console.error("Failed to fetch nodes:", err);
        setError("Could not load knowledge nodes.");
      } finally {
        setLoading(false);
      }
    };

    fetchNodes();
  }, []);

  if (loading) {
    return <p>Loading knowledge nodes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Knowledge Nodes</h1>

      {nodes.length === 0 ? (
        <p>No knowledge nodes found. Start creating your knowledge library!</p>
      ) : (
        <ul>
          {nodes.map((node) => (
            <li key={node.id}>
              {node.title} — {node.node_type}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NodeTest;