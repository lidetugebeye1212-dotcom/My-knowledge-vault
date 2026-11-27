export function buildTree(nodes) {
  const nodeMap = new Map();

  // Create a copy of every node with an empty children array.
  nodes.forEach((node) => {
    nodeMap.set(node.id, {
      ...node,
      children: [],
    });
  });

  const roots = [];

  // Connect children to their parents.
  nodeMap.forEach((node) => {
    if (node.parent && nodeMap.has(node.parent)) {
      nodeMap.get(node.parent).children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}