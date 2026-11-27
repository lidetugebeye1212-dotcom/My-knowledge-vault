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
  console.error("API Error:", err);

  if (err.response) {
    // Django responded, but returned an error status
    setError(
      `Server error: ${err.response.status} - ${
        JSON.stringify(err.response.data)
      }`
    );
  } else if (err.request) {
    // Request was sent, but no response was received
    setError(
      "No response from Django. Check your server and CORS settings."
    );
  } else {
    // Something went wrong while configuring the request
    setError(err.message);
  }
}finally {
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