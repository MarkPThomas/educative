// There are a total of numCourses courses you have to take.

// The courses are labeled from 0 to numCourses - 1.

// You are also given a prerequisites array, where prerequisites[i] = [a[i], b[i]] indicates that you must take course b[i]
// first if you want to take the course a[i].

// For example, the pair[1, 0] indicates that to take course 1, you have to first take course 0.

// Return TRUE if all of the courses can be finished.Otherwise, return FALSE.

// Constraints:
// 1 ≤ numCourses ≤2000
// 0 ≤ prerequisites.length ≤ 5000
// prerequisites[i].length = 2
// 0 ≤ a[i], b[i]  < numCourses

// All the pairs prerequisites[i] are unique.

import Queue from './Queue.js'

export function canFinish(numCourses, prerequisites) {
  const courseDependencies = {};
  const numberPrereqs = {};

  for (let i = 0; i < numCourses; i++) {
    courseDependencies[i] = [];
    numberPrereqs[i] = 0;
  }

  prerequisites.forEach((prerequisite) => {
    courseDependencies[prerequisite[1]].push(prerequisite[0]);
    numberPrereqs[prerequisite[0]]++;
  })

  const courseOrder = [];
  const queue = [];
  updateQueue(numCourses, queue, numberPrereqs)
  while (queue.length) {
    const course = queue.shift();
    courseOrder.push(course);

    const children = courseDependencies[course];
    children.forEach((child) => {
      numberPrereqs[child]--;
    })

    updateQueue(numCourses, queue, numberPrereqs)
  }

  return courseOrder.length === numCourses;
}

function updateQueue(numCourses, queue, numberPrereqs) {
  for (let i = 0; i < numCourses; i++) {
    if (numberPrereqs[i] === 0) {
      queue.push(i);
      numberPrereqs[i]--;
    }
  }
}