const API_URL = "http://localhost:5000/api/sales_invoice_items";

export async function getSalesInvoiceItems() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load sales invoice items");
  }

  return response.json();
}

export async function createSalesInvoiceItem(
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
    throw new Error("Failed to create sales invoice item");
  }

  return response.json();
}

export async function updateSalesInvoiceItem(
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
    throw new Error("Failed to update sales invoice item");
  }

  return response.json();
}

export async function deleteSalesInvoiceItem(id: number) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete sales invoice item");
  }

  return response.json();
}