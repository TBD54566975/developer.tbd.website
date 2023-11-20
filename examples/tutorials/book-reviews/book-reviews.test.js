import { test, expect, describe, vi } from 'vitest';
import { addReviews } from './book-reviews';

describe('addReviews tests', () => {
  test('should work correctly', async () => {
    // Arrange
    const reviews = [];
    const expected = [];

    // Act
    const result = await addReviews(reviews);

    // Assert
    expect(result).toEqual(expected);
  });
});
