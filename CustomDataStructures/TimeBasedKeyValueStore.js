// Implement a data structure that can store multiple values of the same key at different timestamps and retrieve the
// key’s value at a certain timestamp.

// You’ll need to implement the TimeStamp class. This class has the following functions:

// Init(): This function initializes the values dictionary and timestamp dictionary.

// Set Value(key, value, timestamp): This function stores the key and value at any given timestamp.

// Get Value(key, timestamp): This function returns the value set for this key at the specified timestamp.

// Note: When a query requests the value of a key at a timestamp that is more recent than the most recent entry for that key,
// our data structure should return the value corresponding to the most recent timestamp.

// Constraints:
// 1 ≤ key.length, value.length ≤ 100
// key and value consist of lowercase English letters and digits.
// 1 ≤ timestamp ≤ 10^3
// At most 2×10^3 calls will be made to Set Value and Get Value.
// All the timestamps timestamp of Set are strictly increasing.

// S: O(n)
// where n = total # values
export default class TimeStamp {
  constructor() {
    this.valuesDict = {};
  }

  // T: O(1)
  // S: O(1)
  // Set TimeStamp data variables
  setValue(key, value, timestamp) {
    if (!(key in this.valuesDict)) {
      this.valuesDict[key] = {};
    }
    this.valuesDict[key][timestamp] = value;
  }

  // T: O(log(n))
  // S: O(1)
  // where n = # timestamps
  // Get time_stamp data variables
  getValue(key, timestamp) {
    if (key in this.valuesDict) {
      const values = this.valuesDict[key];
      if (timestamp in values) {
        return values[timestamp];
      } else {
        const timestamps = Object.keys(values);

        if (timestamp < timestamps[0]) {
          return '';
        }
        if (timestamp > timestamps[timestamps.length - 1]) {
          return values[timestamps[timestamps.length - 1]];
        }

        // Get most recent yet older timestamp than specified
        const closestTimestamp = () => {
          let left = 0;
          let right = timestamps.length - 1;
          while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (timestamps[mid] === timestamp) {
              return timestamps[mid];
            }
            if (timestamps[mid] < timestamp) {
              left = mid + 1;
            } else {
              right = mid - 1;
            }
          }
          return timestamps[--left];
        }
        return values[closestTimestamp()];
      }
    } else {
      return '';
    }
  }
}

