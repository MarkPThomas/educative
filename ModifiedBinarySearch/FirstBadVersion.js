// The latest version of a software product fails the quality check.

// Since each version is developed upon the previous one, all the versions created after a bad version are also considered bad.

// Suppose you have n versions with the IDs [1,2,...,n],
// and you have access to an API function that returns TRUE if the argument is the ID of a bad version.

// Your task is to find the first bad version, which is causing all the later ones to be bad.

// You have to implement a solution with the minimum number of API calls.

import API from "./api.js";

const versionApi = new API(0)

function isBadVersion(v) {
  return versionApi.isBad(v);
}

export function firstBadVersion(n) {
  // -- DO NOT CHANGE THIS SECTION
  versionApi.n = n;
  // --
  let callsCount = 0;
  let badVersion = -1;
  let first = 1;
  let last = n;

  while (first < last) {
    const mid = Math.floor((first + last) / 2);
    if (isBadVersion(mid)) {
      badVersion = mid;
      last = mid;
    } else {
      first = mid + 1;
    }
    callsCount++;
  }

  return [badVersion, callsCount];
}