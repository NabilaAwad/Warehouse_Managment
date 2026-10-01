const API_URL = "http://localhost:5000/api/company";

export async function getCompany() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load company");
  }

  return response.json();
}

export async function createCompany(name: string) {
  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name: name,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create company");
  }

  return response.json();
}

export async function updateCompany(id: number, name: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name: name,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update company");
  }

  return response.json();
}