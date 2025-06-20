import { setupServer } from 'msw/node';
import { handlers } from './handlers';
import { beforeAll, afterEach, afterAll } from 'vitest';

export const server = setupServer(...handlers);

export const setupTestServer = () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
};