import { test, expect, describe } from 'vitest';
import { addReviews } from './book-reviews';

describe.skip('addReviews tests', () => {
  test('should work correctly', async () => {
    // Arrange
    const reviews = []; // replace with actual reviews
    const expected = []; // replace with expected result

    // Act
    const result = await addReviews(reviews);

    // Assert
    expect(result).toEqual(expected);
  });
});
