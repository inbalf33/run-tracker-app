const test = require("node:test");
const assert = require("node:assert/strict");
const { calculateTotalDistance, calculateAveragePace } = require("./runCalculations.js");

// --- Test for calculateTotalDistance ---

test("calculateTotalDistance should correctly sum distances of multiple runs", () => {
  // Arrange
  const mockRuns = [
    { distance: 5, duration: 25 },
    { distance: 10, duration: 50 },
    { distance: 3.5, duration: 18 }
  ];

  // Act
  const result = calculateTotalDistance(mockRuns);

  // Assert
  assert.strictEqual(result, 18.5);
});

test("calculateTotalDistance should return 0 for an empty array", () => {
  // Arrange
  const mockRuns = [];

  // Act
  const result = calculateTotalDistance(mockRuns);

  // Assert
  assert.strictEqual(result, 0);
});

test("calculateTotalDistance should return 0 for undefined or null input", () => {
  // Arrange & Act & Assert
  assert.strictEqual(calculateTotalDistance(null), 0);
  assert.strictEqual(calculateTotalDistance(undefined), 0);
});



// --- Test for calculateAveragePace ---

test("calculateAveragePace should return correct average pace in min/km", () => {
  // Arrange: 10km total in 50 minutes -> 5 min/km pace
  const mockRuns = [
    { distance: 4, duration: 20 },
    { distance: 6, duration: 30 }
  ];

  // Act
  const result = calculateAveragePace(mockRuns);

  // Assert
  assert.strictEqual(result, 5);
});

test("calculateAveragePace should return 0 if total distance is 0", () => {
  // Arrange
  const mockRuns = [{ distance: 0, duration: 30 }];

  // Act
  const result = calculateAveragePace(mockRuns);

  // Assert
  assert.strictEqual(result, 0);
});