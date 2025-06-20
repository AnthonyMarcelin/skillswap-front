import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import { UserCard } from '@/components/UserCard';
import { setupTestServer, server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';

// Démarre et gère le cycle de vie du serveur MSW
setupTestServer();

describe('UserCard intégration avec MSW', () => {
  it("affiche les infos utilisateur récupérées via l'API", async () => {
    render(
      <MemoryRouter initialEntries={['/user/42']}>
        <Routes>
          <Route path="/user/:id" element={<UserCard />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.queryByText(/chargement du profil/i)).not.toBeInTheDocument()
    );

    expect(screen.getByText('Marie Curie')).toBeInTheDocument();
    expect(screen.getByText('marie.curie@example.com')).toBeInTheDocument();
    expect(screen.getByText('Physique')).toBeInTheDocument();
    expect(screen.getByText('Chimie')).toBeInTheDocument();
    expect(screen.getByText('Disponible')).toBeInTheDocument();
    expect(
      screen.getByText(/pionnière dans la recherche sur la radioactivité/i)
    ).toBeInTheDocument();

    const img = screen.getByAltText(/photo de profil/i) as HTMLImageElement;
    expect(img.src).toBe('https://placekitten.com/200/300');
  });

  it('peut override le mock pour tester un utilisateur différent', async () => {
    server.use(
      http.get('/users/:id', () =>
        HttpResponse.json({
          data: {
            id: 99,
            firstname: 'Albert',
            lastname: 'Einstein',
            email: 'albert.einstein@example.com',
            profile_picture: 'https://placekitten.com/400/400',
            skills: [{ id: 3, name: 'Relativité' }],
            availability: 'Indisponible',
            description: 'Physicien théoricien.',
          },
        })
      )
    );

    render(
      <MemoryRouter initialEntries={['/user/99']}>
        <Routes>
          <Route path="/user/:id" element={<UserCard />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.queryByText(/chargement du profil/i)).not.toBeInTheDocument()
    );

    expect(screen.getByText('Albert Einstein')).toBeInTheDocument();
    expect(screen.getByText('albert.einstein@example.com')).toBeInTheDocument();
    expect(screen.getByText('Relativité')).toBeInTheDocument();
    expect(screen.getByText('Indisponible')).toBeInTheDocument();
    expect(screen.getByText(/physicien théoricien/i)).toBeInTheDocument();

    const img = screen.getByAltText(/photo de profil/i) as HTMLImageElement;
    expect(img.src).toBe('https://placekitten.com/400/400');
  });
});
