import { test, expect, describe, beforeAll, vi } from 'vitest';
import { userDid } from './book-reviews';

describe('addReviews tests', () => {
  // You can set up any necessary mocks here

  test('should return a did', async () => {
    // Assert
    expect(userDid).toBeTypeOf('string');
  });
});
