import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';

import { app } from '../server';
import { db } from '../db.js';

vi.spyOn(db, 'initDb');
vi.spyOn(db, 'storeVote');

describe('Server endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/csrf-token', () => {
    it('returns a csrf token', async () => {
      const res = await request(app).get('/api/csrf-token');

      expect(res.status).toBe(200);
      expect(res.body.csrfToken).toBeDefined();

      expect(res.headers['set-cookie']).toBeDefined();

      const cookie = res.headers['set-cookie'][0];
      const [csrfToken, path, httpOnly, secure, sameSite] = cookie.split(';');
      expect(csrfToken).toBeDefined();
      expect(path).toBe(' Path=/');
      expect(httpOnly).toBe(' HttpOnly');
      expect(secure).toBe(' Secure');
      expect(sameSite).toBe(' SameSite=None');

      const [csrfTokenLabel, csrfTokenValue] = csrfToken.split('=');
      expect(csrfTokenLabel).toContain('x-csrf-token');
      expect(csrfTokenValue).toBeDefined();
    });
  });

  // get csrf token & cookie
  const getCsrf = async () => {
    const csrfTokenRes = await request(app).get('/api/csrf-token');
    const csrfToken = csrfTokenRes.body.csrfToken;
    const cookie = csrfTokenRes.headers['set-cookie'][0].split(';')[0];

    return { csrfToken, cookie };
  };

  describe('POST /api/feedback', async () => {
    it('computes helpful votes', async () => {
      const { csrfToken, cookie } = await getCsrf();

      const res = await request(app)
        .post('/api/feedback')
        .set('x-csrf-token', csrfToken)
        .set('Cookie', [cookie])
        .send({ pageLink: 'https://example.com', rating: 'helpful' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
    });

    it('computes not-helpful votes', async () => {
      const { csrfToken, cookie } = await getCsrf();

      const res = await request(app)
        .post('/api/feedback')
        .set('x-csrf-token', csrfToken)
        .set('Cookie', [cookie])
        .send({ pageLink: 'https://example.com', rating: 'notHelpful' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBeTruthy();
    });

    it('validates request parameters', async () => {
      const { csrfToken, cookie } = await getCsrf();

      const res = await request(app)
        .post('/api/feedback')
        .set('x-csrf-token', csrfToken)
        .set('Cookie', [cookie])
        .send();

      expect(res.status).toBe(400);
      expect(res.body).toStrictEqual({ message: 'Missing rating or pageLink' });

      const res2 = await request(app)
        .post('/api/feedback')
        .set('x-csrf-token', csrfToken)
        .set('Cookie', [cookie])
        .send({ pageLink: 'https://example.com' });

      expect(res2.status).toBe(400);
      expect(res2.body).toStrictEqual({
        message: 'Missing rating or pageLink',
      });

      const res3 = await request(app)
        .post('/api/feedback')
        .set('x-csrf-token', csrfToken)
        .set('Cookie', [cookie])
        .send({ rating: 'anything' });

      expect(res3.status).toBe(400);
      expect(res3.body).toStrictEqual({
        message: 'Missing rating or pageLink',
      });
    });

    it('validates rating', async () => {
      const { csrfToken, cookie } = await getCsrf();

      const res = await request(app)
        .post('/api/feedback')
        .set('x-csrf-token', csrfToken)
        .set('Cookie', [cookie])
        .send({ pageLink: 'http://example.com', rating: 'anything' });

      expect(res.status).toBe(400);
      expect(res.body).toStrictEqual({ message: 'Invalid rating' });
    });

    it('requires a csrf token', async () => {
      const res = await request(app).post('/api/feedback');

      expect(res.status).toBe(403);
      expect(res.body.error).toBe('csrf validation error');
    });

    it('handles server errors gracefully', async () => {
      const { csrfToken, cookie } = await getCsrf();

      db.storeVote.mockRejectedValueOnce(new Error('Blah!'));

      const res = await request(app)
        .post('/api/feedback')
        .set('x-csrf-token', csrfToken)
        .set('Cookie', [cookie])
        .send({ pageLink: 'http://example.com', rating: 'helpful' });

      expect(res.status).toBe(500);
      expect(res.body).toStrictEqual({
        success: false,
        message: 'An error occurred while processing the feedback',
      });
    });
  });

  describe('General error handling', () => {
    it('fallbacks to a generic 500 for unhandled errors', async () => {
      const res = await request(app).get('/fake-error');

      expect(res.status).toBe(500);
      expect(res.body).toStrictEqual({
        success: false,
        message: 'Server error',
      });
    });
  });
});
