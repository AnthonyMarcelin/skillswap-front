// src/services/auth.service.ts
import api from '@/api/axios';

export interface RegisterDto {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  street: string;
  zipcode: string;
  city: string;
  profil_photo: string;     
  description: string;
  availability: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export async function register(dto: RegisterDto) {
  // Axios renvoie déjà la promesse du JSON
  const { data } = await api.post('/auth/register', dto);
  return data;
}             

export async function login(dto: LoginDto) {
  // Axios renvoie déjà la promesse du JSON
  const { data } = await api.post('/auth/login', dto);
  return data;
}

export async function logout() {
  try {
    // Envoie une requête au backend pour supprimer le cookie HttpOnly
    const { data } = await api.post('/auth/logout', {}, { withCredentials: true });
    return data;
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    throw error;
  }
}