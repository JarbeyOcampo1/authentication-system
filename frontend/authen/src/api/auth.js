const API_URL = "http://localhost:5000";

export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  // 🔥 CLAVE: manejar error HTTP
  if (!res.ok) {
    throw new Error(data.error || "Error en login");
  }

  return data;
}

export async function register(nombre, email, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Error en registro");
  }

  return data;
}
