export function buildKnowledgeTree(nodes) {
  // Step 1: Create a Map containing every node.
  const nodeMap = new Map();

  nodes.forEach((node) => {
    nodeMap.set(node.id, {
      ...node,
      children: [],
    });
  });

  // Step 2: Separate root nodes from child nodes.
  const roots = [];

  nodes.forEach((node) => {
    const currentNode = nodeMap.get(node.id);

    if (node.parent && nodeMap.has(node.parent)) {
      // Attach this node to its parent.
      nodeMap.get(node.parent).children.push(currentNode);
    } else {
      // Nodes without a valid parent become root nodes.
      roots.push(currentNode);
    }
  });

  // Step 3: Sort nodes by position, then title.
  function sortChildren(items) {
    items.sort((a, b) => {
      return (
        (a.position ?? 0) - (b.position ?? 0) ||
        a.title.localeCompare(b.title)
      );
    });

    items.forEach((item) => {
      sortChildren(item.children);
    });
  }

  sortChildren(roots);

  return roots;
}