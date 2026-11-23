import api from "./client";

// Fetch all knowledge nodes
export const getNodes = async () => {
  const response = await api.get("nodes/");
  return response.data;
};

// Create a new knowledge node
export const createNode = async (nodeData) => {
  const response = await api.post("nodes/", nodeData);
  return response.data;
};

// Update an existing knowledge node
export const updateNode = async (id, nodeData) => {
  const response = await api.patch(`nodes/${id}/`, nodeData);
  return response.data;
};

// Delete a knowledge node
export const deleteNode = async (id) => {
  await api.delete(`nodes/${id}/`);
};