// src/hooks/useAuth.ts
export function useAuth() {
  const token = document.cookie.includes("accessToken=");
  return token;
}
