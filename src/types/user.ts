export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  profile_picture?: string | null;
  skills: { name: string }[]; // ← ici !
  availability: string;
  description: string;
}
