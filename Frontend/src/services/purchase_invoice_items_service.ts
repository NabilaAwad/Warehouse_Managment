const API_URL = "http://localhost:5000/api/purchase_invoice_items";

export async function getPurchaseInvoiceItems() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load purchase invoice items");
  }

  return response.json();
}

export async function createPurchaseInvoiceItem(
  invoice_id: number,
  material_id: number,
  quantity: number,
  price: number
) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      invoice_id,
      material_id,
      quantity,
      price,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create purchase invoice item");
  }

  return response.json();
}

export async function updatePurchaseInvoiceItem(
  id: number,
  invoice_id: number,
  material_id: number,
  quantity: number,
  price: number
) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
     invoice_id,
      material_id,
      quantity,
      price,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update purchase invoice item");
  }

  return response.json();
}

export async function deletePurchaseInvoiceItem(id: number) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete purchase invoice item");
  }

  return response.json();
}