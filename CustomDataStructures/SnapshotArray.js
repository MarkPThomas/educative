// In this challenge, you have to implement a Snapshot Array with the following properties:

// Init (length): This is the constructor and it initializes the data structure to hold the specified number of indexes.

// Initially, the value at each index is 0.

// Set Value (idx, val): This property sets the value at a given index idx to value val.

// Snapshot(): This method takes no parameters and returns the Snap ID.

// Snap ID is the number of times that the snapshot function was called, less 1, as we start the count at 0.

// The first time this function is called, it saves a snapshot and returns 0.

// The nth time it is called, after saving the snapshot, it returns n−1.

// Get Value (idx, Snap ID) method returns the value at the index in the snapshot with the given Snap ID.

// Suppose that we have three nodes whose values we wish to track in the snapshot array.

// Initially, the value of all the nodes will be 0.

// After calling the Set Value (1, 4) function, the value of node 1 will change to 4.

// If we take a snapshot at this point, the current values of all the nodes will be saved with Snap ID 0.

// Now, if we call Set Value (1, 7), the current value for node 1 will change to 7.

// Now, if we call the Get Value (1, 0) function, we will get the value of node 1 from snapshot 0, that is, 4.

// Constraints:
// 1 ≤ length ≤ 5×10^3
// 0 ≤ idx < length
// 0 ≤ val ≤ 10^9
// 0 ≤ Snap ID < (the total number of times we call Snapshot)
// At most 5×10^3 calls will be made to Set Value, Snapshot, and Get Value.

// S: O(n * m) when used
// where n = length, m = # snapshots
export default class SnapshotArray {
  // T: O(1)
  // S: O(1)
  constructor(length) {
    // Storing this allows us to return or shallow-copy to initialize uninitialized nodes upon get/set request
    this.initialKeyValue = {
      'latest': 0,
      0: 0
    };
    this.keyValues = {};
    this.snapshotId = 0;
    this.length = length;
  }

  // T: O(1)
  // S: O(1)
  // Function setValue sets the value at a given index idx to val.
  setValue(idx, val) {
    if (0 <= idx && idx < this.length) {
      if (!(idx in this.keyValues)) {
        this.keyValues[idx] = { ...this.initialKeyValue };
      }

      const keyVersions = this.keyValues[idx];

      keyVersions[this.snapshotId] = val;
      if (keyVersions.latest !== this.snapshotId) {
        keyVersions.latest = this.snapshotId;
      }
    }
  }

  // T: O(1)
  // S: O(1)
  // This function takes no parameters and returns the snapID.
  // snapID is the number of times that the snapshot() function was called minus 1.
  snapshot() {
    this.snapshotId++;
    return this.snapshotId - 1;
  }

  // T: O(1)
  // S: O(1)
  // Function getValue returns the value at the index idx with the given snapID.
  getValue(idx, snapID) {
    if (0 <= idx && idx < this.length && 0 <= snapID && snapID < this.snapshotId) {
      if (idx in this.keyValues) {
        const keyVersions = this.keyValues[idx];
        // If idx & snapID are valid, but value was not set at the requested snapId, roll back to latest set version
        const version = Math.min(snapID, keyVersions.latest);
        return keyVersions[version];
      } else {
        // If not yet set/initialized, return the expected initial value
        return 0;
      }
    }
  }
}