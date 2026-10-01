
const API_URL = "http://localhost:5000/api/users";

export async function getUsers() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load users");
  }

  return response.json();
}

export async function createusers(
  name: string,
  user_name: string,
  password:string,
  role:string
) {
  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name: name,
      user_name: user_name,
      password:password,
      role:role
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create users");
  }

  return response.json();
}

export async function Updateusers(
  id: number,
  name: string,
  user_name: string,
  password:string,
  role:string
) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
       name: name,
      user_name: user_name,
      password:password,
      role:role
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update users");
  }

  return response.json();
}

export async function deleteusers(id: number) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete users");
  }

  return response.json();
}

