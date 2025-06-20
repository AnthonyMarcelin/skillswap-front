// src/services/auth.service.ts
import api from "@/api/axios";

export interface RegisterDto {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  street: string;
  zipcode: string;
  city: string;
  profile_picture: string;
  description: string;
  availability: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export async function register(dto: RegisterDto) {
  // Axios renvoie déjà la promesse du JSON
  const { data } = await api.post("/auth/register", dto, {
    withCredentials: true,
  });
  return data;
}

export async function login(dto: LoginDto) {
  // Axios renvoie déjà la promesse du JSON
  const { data } = await api.post("/auth/login", dto, {
    withCredentials: true,
  });
  return data;
}

export async function logout() {
  // Axios renvoie déjà la promesse du JSON
  await api.post("/auth/logout", {}, { withCredentials: true });
}

export async function checkAuth() {
  const { data } = await api.get("/auth/check", { withCredentials: true });
  return data; // attendu { authenticated: boolean, user?: ... } et mon useAuth : import { useState, useEffect, useCallback } from "react";
}
