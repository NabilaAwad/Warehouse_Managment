const API_URL = "http://localhost:5000/api/dashboard";

export async function getDashboardStats() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load dashboard statistics");
  }

  return response.json();
} 