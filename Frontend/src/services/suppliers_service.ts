
const API_URL = "http://localhost:5000/api/suppliers";

export async function getSuppliers() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load suppliers");
  }

  return response.json();
}

export async function createSuppliers(
  name: string,
  phone: string,
  email:string,
  address:string
) {
  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name: name,
      phone: phone,
      email:email,
      address:address
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create suppliers");
  }

  return response.json();
}

export async function UpdateSuppliers(
  id: number,
   name: string,
  phone: string,
  email:string,
  address:string
) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
       name: name,
      phone: phone,
      email:email,
      address:address
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update suppliers");
  }

  return response.json();
}

export async function deleteSuppliers(id: number) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete suppliers");
  }

  return response.json();
}

