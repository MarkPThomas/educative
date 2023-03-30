export class Point {
  // __init__ will be used to make a Point type object
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distance() {
    // sqrt is constant so can be ignored
    return this.x ** 2 + this.y ** 2;
  }
}
