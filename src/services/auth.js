// src/services/auth.js

// Key de storage
const USERS_KEY = "lug_users";
const CURRENT_KEY = "lug_current_user";

// Util: cargar/guardar usuarios
const loadUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) ?? [];
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Hash SHA-256 con Web Crypto (hex)
async function sha256(text) {
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest("SHA-256", enc.encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// API pública

export async function registerUser({ name, email, tel, password }) {
  const users = loadUsers();
  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    const err = new Error("El correo ya está registrado.");
    err.code = "EMAIL_TAKEN";
    throw err;
  }
  const passwordHash = await sha256(password);
  const newUser = {
    id: crypto.randomUUID(),
    name,
    email,
    tel,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveUsers(users);
  // “loguea” directo al registrar
  localStorage.setItem(CURRENT_KEY, JSON.stringify({ id: newUser.id, email, name, tel }));
  return { id: newUser.id, email, name, tel };
}

export async function loginUser({ email, password }) {
  const users = loadUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    const err = new Error("Correo o contraseña inválidos.");
    err.code = "INVALID_CREDENTIALS";
    throw err;
  }
  const passwordHash = await sha256(password);
  if (passwordHash !== user.passwordHash) {
    const err = new Error("Correo o contraseña inválidos.");
    err.code = "INVALID_CREDENTIALS";
    throw err;
  }
  localStorage.setItem(CURRENT_KEY, JSON.stringify({ id: user.id, email: user.email, name: user.name, tel: user.tel }));
  return { id: user.id, email: user.email, name: user.name, tel: user.tel };
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_KEY);
}

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(CURRENT_KEY)) || null;
  } catch {
    return null;
  }
}

export function updateCurrentUserProfile({ name, tel }) {
  // Actualiza perfil en lista + sesión
  const current = getCurrentUser();
  if (!current) return null;

  const users = loadUsers();
  const idx = users.findIndex((u) => u.id === current.id);
  if (idx >= 0) {
    users[idx] = { ...users[idx], name: name ?? users[idx].name, tel: tel ?? users[idx].tel };
    saveUsers(users);
    const updated = { ...current, name: users[idx].name, tel: users[idx].tel };
    localStorage.setItem(CURRENT_KEY, JSON.stringify(updated));
    return updated;
  }
  return current;
}
