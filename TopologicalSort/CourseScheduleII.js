// Let’s assume that there are a total of n courses labeled from 0 to n−1.

// Some courses may have prerequisites. A list of prerequisites is specified such that if
// Prerequisites_i = a, b, you must take course b before course a.

// Given the total number of courses n and a list of the prerequisite pairs, return the course order a student should
// take to finish all of the courses.

// If there are multiple valid orderings of courses, then the return any one of them.

// Note: There can be a course in the 0 to n−1 range with no prerequisites.

// Constraints:
// Let n be the number of courses.
// 1 ≤ n ≤ 2000
// 0 ≤ prerequisites.length ≤ n*(n−1)
// prerequisites[i].length == 2
// 0 ≤ a, b < n
// a ≠ b
// All the pairs [a, b]

import Queue from './queue.js'

export function findOrder(n, prerequisites) {
  const adjacencies = {};
  const inDegrees = {};

  for (let i = 0; i < n; i++) {
    adjacencies[i] = [];
    inDegrees[i] = 0;
  }

  prerequisites.forEach((prerequisite) => {
    adjacencies[prerequisite[1]].push(prerequisite[0]);
    inDegrees[prerequisite[0]]++;
  });

  const result = [];
  const queue = [];
  updateQueue(n, queue, inDegrees);
  while (queue.length) {
    const course = queue.shift();
    result.push(course);

    const children = adjacencies[course];
    children.forEach((child) => {
      inDegrees[child]--;
    })

    updateQueue(n, queue, inDegrees);
  }

  return result.length === n ? result : [];
}

function updateQueue(n, queue, inDegrees) {
  for (let i = 0; i < n; i++) {
    if (inDegrees[i] === 0) {
      queue.push(i);
      inDegrees[i]--;
    }
  }
}