
const API_URL = "http://localhost:5000/api/materials";

export async function getMaterials() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load materials");
  }

  return response.json();
}

export async function createMaterials(
  name: string,
  unit: string,
) {
  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name: name,
      unit: unit,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create materials");
  }

  return response.json();
}

export async function UpdateMaterials(
  id: number,
  name: string,
  unit: string,
) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name: name,
      unit: unit,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update materials");
  }

  return response.json();
}

export async function deleteMaterial(id: number) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete material");
  }

  return response.json();
}

