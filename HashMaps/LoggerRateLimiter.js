// For the given stream of message requests and their timestamps as input, you must implement a logger rate limiter system that
// decides whether the current message request is displayed.

// The decision depends on whether the same message has already been displayed in the last S seconds.

// If yes, then the decision is FALSE, as this message is considered a duplicate.

// Otherwise, the decision is TRUE.

// Note: Several message requests, though received at different timestamps, may carry identical messages.

// Constraint:

// Timestamps are in ascending order.

// T: O(1)
// S: O(n) where n = # incoming messages stored
export var RequestLogger = function (timeLimit) {
  this.timeLimit = timeLimit;
  this.log = {};
};

// This function decides whether the message request should be accepted or rejected
RequestLogger.prototype.messageRequestDecision = function (timestamp, request) {
  if (!this.log[request] || timestamp - this.log[request] >= this.timeLimit) {
    this.log[request] = timestamp;
    return true;
  }
  return false;
};