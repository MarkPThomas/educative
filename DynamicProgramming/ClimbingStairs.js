// You are climbing a staircase.

// It takes n steps to reach the top.

// Each time, you can either climb 1 or 2 steps.

// In how many distinct ways can you climb to the top?

// Constraints:

// 1 ≤ n ≤ 45

// T: O(n)
// S: O(n)
// where n = the number of stairs specified
export function climbStairs(nums) {
  if (nums < 2) {
    return 1;
  }

  const climbSubStairs = new Array(nums).fill(0);
  climbSubStairs[0] = 1;
  climbSubStairs[1] = 1;
  for (let stair = 2; stair <= nums; stair++) {
    climbSubStairs[stair] = (climbSubStairs[stair - 1] + climbSubStairs[stair - 2])
  }

  return climbSubStairs[nums];
}
