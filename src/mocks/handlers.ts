// Simulation de requête réseau : axios envoie une requête, le handler intercepte la requête et répond avec une fausse réponse HTTP.i

import { http } from 'msw';

export const handlers = [
  http.get('http://localhost:3000/api/users/:id', (req: any, res: any, ctx: any) => {
    const { id } = req.params;
    if (id === '42') {
      return res(
        ctx.status(200),
        ctx.json({
          id: 42,
          firstname: 'Marie',
          lastname: 'Curie',
          email: 'marie.curie@example.com',
          profile_picture: 'https://placekitten.com/200/300',
          skills: [
            { id: 1, name: 'Physique' },
            { id: 2, name: 'Chimie' },
          ],
          availability: 'Disponible',
          description: 'Pionnière dans la recherche sur la radioactivité',
        })
      );
    }
    return res(ctx.status(404));
  }),

  http.get('/api/auth/check', (req: any, res: any, ctx: any) => {
    return res(
      ctx.status(200),
      ctx.json({ user: { id: 1, firstname: 'Test', lastname: 'User' } })
    );
  })];