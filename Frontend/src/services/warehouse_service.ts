
const API_URL = "http://localhost:5000/api/warehouse";

export async function getWarehouse() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load warehouse");
  }

  return response.json();
}

export async function createWarehouse(
  name: string,
  location: string,
) {
  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name: name,
      location: location,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create warehouse");
  }

  return response.json();
}

export async function UpdateWarehouses(
  id: number,
  name: string,
  location: string,
) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name: name,
      location: location,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update warehouse");
  }

  return response.json();
}

export async function deleteWarehouse(id: number) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete warehouse");
  }

  return response.json();
}

