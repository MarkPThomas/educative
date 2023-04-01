// In a single-player jump game, the player starts at one end of a series of squares,
// with the goal of reaching the last square.

// At each turn, the player can take up to s steps towards the last square,
// where s is the value of the current square.

// For example, if the value of the current square is 3, the player can take either 3 steps, or 2 steps, or 1 step
// in the direction of the last square.

// The player cannot move in the opposite direction, that is, away from the last square.

// You’ve been provided with the nums integer array, representing the series of squares.

// You’re initially positioned at the first index of the array.

// Find the minimum number of jumps needed to reach the last index of the array.

// You may assume that you can always reach the last index.

// T: O(n)
// S: O(1)
export function jumpGameTwo(nums) {
  let nextMaxIndex = 0;
  let currentMaxIndex = 0;
  let jumps = 0;

  if (nums.length === 1) {
    return 0;
  }

  for (let i = 0; i < nums.length; i++) {
    nextMaxIndex = Math.max(nextMaxIndex, i + nums[i]);

    if (i === currentMaxIndex) {
      jumps++;
      currentMaxIndex = nextMaxIndex;
      if (currentMaxIndex >= nums.length - 1) {
        break;
      }
    }
  }

  return jumps;
}