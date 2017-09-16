class Queue {
  constructor() {
    this.collection = [];
    this.activeCollection = [];

    this._looping = false;
  }

  clear() {
    this.collection = [];
    this.activeCollection = [];
  }

  add(o) {
    this.collection.push(o);
    this.activeCollection.push(o);
  }
  remove(oI) {
    let o;

    if (typeof oI === 'number') {
      this.collection = this.collection.filter((v, i) => {
        if (i === oI) {
          o = v;
          return false;
        }
        return true;
      });
    } else if (typeof oI === 'function'){
      this.collection = this.collection.filter((v) => {
        if (oI(v)) {
          o = v;
          return false;
        }
        return true;
      });
    }

    this.activeCollection = this.activeCollection.filter((v) => o != v);
  }

  get(i) {
    return this.collection[i];
  }
  next() {
    if (this.activeCollection.length > 0) {
      return this.activeCollection.shift();
    } else if (this.looping) {
      this.activeCollection = this.collection.slice();
      return this.next();
    } else {
      throw new Error('Something tried to use Queue#next(), but the queue is empty');
    }
  }
  randomNext() {
    if (this.activeCollection.length > 0) {
      const o = this.activeCollection[Math.floor(Math.random() * this.activeCollection.length)];
      this.activeCollection = this.activeCollection.filter((v) => o != v);
      return o;
    }
  }

  hasNext() {
    return this.activeCollection.length > 0;
  }

  get length() { return this.collection.length; }

  get looping() { return this._looping; }
  set looping(v) {
    if (typeof v !== 'boolean') {
      throw new Error(`Something tried to set Queue#looping to ${typeof v}, it should be a boolean`);
    } else {
      this._looping = v;
    }
  }
}

if (typeof module.exports !== 'undefined') module.exports = Queue;
