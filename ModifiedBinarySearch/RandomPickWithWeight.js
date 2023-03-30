// You’re given an array of positive integers, w, where w[i] describes the weight of the ith index.

// You need to perform weighted random selection to return an index from the w array.

// The larger the value of w[i], the heavier the weight is.

// Hence, the higher the chances of its index being picked.

// Suppose the weights array contains the values [12,84,35].

// In this case, the probabilities of picking the indexes will be the following:

// Index 0:
// 12/(12+84+35)=9.2%

// Index 1:
// 84/(12+84+35)=64.1%

// Index 2:
// 35/(12+84+35)=26.7%

// Note: Since we’re randomly choosing among the options, there is no guarantee that in any given run of the program,
// any of the elements will be selected with the exact expected frequency.

// Since a good randomized picking function shouldn’t result in elements being picked with precisely the same frequencies as
// predicted mathematically, we print the frequency with which each element is picked as a result of calling the
// Pick Index function 900 times for each list.

// Next to the actual frequency, we print the expected frequency.

// The better our function is, the more closely it matches the expected frequencies over several runs.

// You are expected to implement a class whose constructor receives the list of weights and has a method Pick Index that picks an
// index at random, taking into account the weight of each index.

class randomPickWithWeight {
  constructor(w) {
    this.runningSum = [];

    let currentSum = 0;
    w.forEach((weight) => {
      this.runningSum.push(currentSum += weight);
    });
    this.maxRunningSum = currentSum;
  }

  binarySearch(target, range) {
    let first = 0;
    let last = range.length - 1;

    // get index of first value >= target
    while (first < last) {
      const mid = Math.floor((first + last) / 2);

      if (range[mid] === target) {
        return mid;
      }

      if (target < range[mid]) {
        last = mid;
      } else {
        first = mid + 1;
      }
    }
    return last;
  }

  pickIndex() {
    const maxNumber = Math.floor(Math.random() * this.maxRunningSum);

    return this.binarySearch(maxNumber, this.runningSum);
  }
}

function main() {
  let counter = 900,
    weights1 = [1, 2, 3, 4, 5],
    weights2 = [1, 12, 23, 34, 45, 56, 67, 78, 89, 90],
    weights3 = [10, 20, 30, 40, 50],
    weights4 = [1, 10, 23, 32, 41, 56, 62, 75, 87, 90],
    weights5 = [12, 20, 35, 42, 55],
    weights6 = [10, 10, 10, 10, 10],
    weights7 = [10, 10, 20, 20, 20, 30],
    weights8 = [1, 2, 3],
    weights9 = [10, 20, 30, 40],
    weights10 = [5, 10, 15, 20, 25, 30],
    weights = [
      weights1,
      weights2,
      weights3,
      weights4,
      weights5,
      weights6,
      weights7,
      weights8,
      weights9,
      weights10,
    ],
    dict = {};

  for (let i = 0; i < weights.length; i++) {
    console.log(i + 1 + ".\tInput:", weights[i], ", pickIndex() called", counter, "times\n");
    for (let l = 0; l < weights[i].length; l++) {
      dict[`${l}`] || (dict[`${l}`] = 0);
    }
    for (let j = 0; j < counter; j++) {
      let sol = new randomPickWithWeight(weights[i]);
      let index = sol.pickIndex();
      dict[index] += 1;
    }
    console.log("-".repeat(100));
    console.log(
      "Indexes".padEnd(10, " "),
      "|".padEnd(5, " "),
      "Weights".padEnd(10, " "),
      "|".padEnd(5, " "),
      "Occurences".padEnd(15, " "),
      "|".padEnd(5, " "),
      "Frequency".padEnd(15, " "),
      "|".padEnd(5, " "),
      "Expected Frequency".padEnd(15, " ")
    );
    console.log("-".repeat(100));
    Object.keys(dict).forEach((key) => {
      let value = dict[key];
      console.log(
        `${key}`.padEnd(10, " "),
        "|".padEnd(5, " "),
        `${weights[i][key]}`.padEnd(10, " "),
        "|".padEnd(5, " "),
        `${value}`.padEnd(15, " "),
        "|".padEnd(5, " "),
        String(((value / counter) * 100).toFixed(2) + "%").padEnd(15, " "),
        "|".padEnd(5, " "),
        String(
          (
            (weights[i][key] /
              weights[i].reduce((a, b) => {
                return a + b;
              }, 0)) *
            100
          ).toFixed(2) + "%"
        ).padEnd(15, " ")
      );
    });
    dict = {};
    console.log("\n", "-".repeat(100), "\n");
  }
}

main();