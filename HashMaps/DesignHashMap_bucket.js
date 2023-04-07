// A class implementation of the bucket data structure

class Bucket {
  // Initialize bucket here
  constructor() {
    this.bucket = [];
  }

  // get value from bucket
  get(key) {
    let value = -1
    for (let i = 0; i < this.bucket.length; i++) {
      if (this.bucket[i][0] === key) {
        value = this.bucket[i][1];
        break;
      }
    }
    return value;
  };

  // put value in bucket
  update(key, value) {
    for (let i = 0; i < this.bucket.length; i++) {
      if (this.bucket[i][0] === key) {
        this.bucket[i][1] = value;
        return;
      }
    }

    this.bucket.push([key, value]);
  };

  // delete value from bucket
  remove(key) {
    let removeIndex = -1;
    for (let i = 0; i < this.bucket.length; i++) {
      if (this.bucket[i][0] === key) {
        removeIndex = i;
        break;
      }
    }

    if (removeIndex !== -1) {
      this.bucket.splice(removeIndex, 1);
    }
  };
}

export default Bucket;