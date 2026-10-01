const API_URL = "http://localhost:5000/api/stock";

export async function getStock() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load stock");
  }

  return response.json();
}

export async function createStock(
  warehouse_id: number,
  material_id: number,
  quantity: number
) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      warehouse_id,
      material_id,
      quantity,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create stock");
  }

  return response.json();
}

export async function updateStock(
  id: number,
  warehouse_id: number,
  material_id: number,
  quantity: number
) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      warehouse_id,
      material_id,
      quantity,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update stock");
  }

  return response.json();
}

export async function deleteStock(id: number) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete stock");
  }

  return response.json();
}