
const API_URL = "http://localhost:5000/api/sales_invoice";

export async function getSalesInvoices() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load Sales invoices");
  }

  return response.json();
}

export async function createSalesInvoice(
  customer_id: number,
  warehouse_id: number,
  date: string,
  items: {
    material_id: number;
    quantity: number;
    price: number;
  }[]
) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customer_id,
      warehouse_id,
      date,
      items,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create Sales invoice");
  }

  return response.json();
}

export async function updateSalesInvoice(
  id: number,
  customer_id: number,
  warehouse_id: number,
  date: string
) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customer_id,
      warehouse_id,
      date,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update Sales invoice");
  }

  return response.json();
}

export async function deleteSalesInvoice(id: number) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete Sales invoice");
  }

  return response.json();
}
