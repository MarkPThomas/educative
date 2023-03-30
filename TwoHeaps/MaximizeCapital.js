// You need to develop a program for making automatic investment decisions for a busy investor.

// The investor has some start-up capital, c, to invest and a portfolio of projects in which they would
// like to invest in.

// The investor wants to maximize their cumulative capital as a result of this investment.

// To help them with their decision, they have information on the capital requirement for each project
// and the profit it’s expected to yield.

// For example, if project A has a capital requirement of, and the investor’s current capital is 1, then
// the investor can’t invest in this project.

// On the other hand, if the capital requirement of a project B is 1, then the investor can invest in this
// project.

// Now, supposing that the project yields a profit of 2, the investor’s capital at the end of the project
// will be 1+2=3.

// The investor can now choose to invest in project A as well since their current capital has increased.

// As a basic risk-mitigation measure, the investor would like to set a limit on the number of projects, k,
// they invest in.

// For example, if the value of k is 2, then we need to identify the two projects that the investor can
// afford to invest in, given their capital requirements, and that yield the maximum profits.

// Further, these are one-time investment opportunities, that is, the investor can only invest
// once in a given project.

import MinHeap from './min_heap.js'

export function maximumCapital(c, k, capitals, profits) {
  const capitalsMinHeap = new MinHeap();
  // Record sorted capital with corresponding index
  for (let i = 0; i < capitals.length; i++) {
    capitalsMinHeap.offer([capitals[i], i]);
  }

  const profitsMaxHeap = new MinHeap();

  for (let i = 0; i < k; i++) {
    // Get all currently affordable investments
    while (capitalsMinHeap.size() > 0
      && capitalsMinHeap.peek()[0] <= c) {
      let investment = capitalsMinHeap.poll();
      profitsMaxHeap.offer([-1 * profits[investment[1]], investment[0]]);
    }
    // Get highest return
    if (profitsMaxHeap.size()) {
      c += -1 * profitsMaxHeap.poll()[0];
    }

  }

  return c;
}