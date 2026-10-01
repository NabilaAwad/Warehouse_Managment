const API_URL = "http://localhost:5000/api/purchase_invoice";

export async function getPurchaseInvoices() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load purchase invoices");
  }

  return response.json();
}

export async function createPurchaseInvoice(
  supplier_id: number,
  warehouse_id: number,
  date: string
) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      supplier_id,
      warehouse_id,
      date,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create purchase invoice");
  }

  return response.json();
}

export async function updatePurchaseInvoice(
  id: number,
  supplier_id: number,
  warehouse_id: number,
  date: string
) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      supplier_id,
      warehouse_id,
      date,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update purchase invoice");
  }

  return response.json();
}

export async function deletePurchaseInvoice(id: number) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete purchase invoice");
  }

  return response.json();
}