
const API_URL = "http://localhost:5000/api/customers";

export async function getCustomers() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load customers");
  }

  return response.json();
}

export async function createCustomers(
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
    throw new Error("Failed to create customer");
  }

  return response.json();
}

export async function UpdateCustomers(
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
    throw new Error("Failed to update customers");
  }

  return response.json();
}

export async function deleteCustomers(id: number) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete customers");
  }

  return response.json();
}

