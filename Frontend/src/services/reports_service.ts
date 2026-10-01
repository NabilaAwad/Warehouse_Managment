const API_URL = "http://localhost:5000/api/reports";

export async function getInventoryReport() {
  const response = await fetch(`${API_URL}/inventory`);

  if (!response.ok) {
    throw new Error("Failed to load inventory report");
  }

  return response.json();
}

export async function getItemMovementReport() {
  const response = await fetch(`${API_URL}/item-movement`);

  if (!response.ok) {
    throw new Error("Failed to load item movement report");
  }

  return response.json();
}

export async function getPurchaseInvoicesReport() {
  const response = await fetch(`${API_URL}/purchase-invoices`);

  if (!response.ok) {
    throw new Error("Failed to load purchase invoices report");
  }

  return response.json();
}

export async function getSalesInvoicesReport() {
  const response = await fetch(`${API_URL}/sales-invoices`);

  if (!response.ok) {
    throw new Error("Failed to load sales invoices report");
  }

  return response.json();
}

export async function getBestSellingMaterialsReport() {
  const response = await fetch(`${API_URL}/best-selling`);

  if (!response.ok) {
    throw new Error("Failed to load best selling report");
  }

  return response.json();
}

export async function getMostAvailableMaterialsReport() {
  const response = await fetch(`${API_URL}/most-available`);

  if (!response.ok) {
    throw new Error("Failed to load most available report");
  }

  return response.json();
}

export async function getMaterialsWithBalanceReport() {
  const response = await fetch(`${API_URL}/with-balance`);

  if (!response.ok) {
    throw new Error("Failed to load materials with balance report");
  }

  return response.json();
}

export async function getMaterialsWithoutBalanceReport() {
  const response = await fetch(`${API_URL}/without-balance`);

  if (!response.ok) {
    throw new Error("Failed to load materials without balance report");
  }

  return response.json();
}