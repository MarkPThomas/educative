// Given a set of n number of tasks, implement a task scheduler method, tasks(), to run in O(n logn) time
// that finds the minimum number of machines required to complete these n tasks.

// Constraints:
// Task start time ≤ Task end time

import MinHeap from './min_heap.js'

export function tasks(tasksList) {
  // Sort tasks by earliest start time
  const orderedTasks = new MinHeap(tasksList);
  let maxMachinesInUse = 0;

  // Schedule machines
  const machinesInUse = new MinHeap();
  while (orderedTasks.size()) {
    const task = orderedTasks.poll();
    let currentMachine;
    if (machinesInUse.size() > 0
      && task[0] >= machinesInUse.peek()[0]) {
      currentMachine = [task[1], machinesInUse.poll()[1]];
    } else {
      maxMachinesInUse++;
      currentMachine = [task[1], maxMachinesInUse];
    }

    machinesInUse.offer(currentMachine);
  }

  return maxMachinesInUse;
}