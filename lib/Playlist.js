const Queue = require('./Queue');
const Song = require('./Song');

class Playlist {
  constructor() {
    this.queue = new Queue();
    this._shuffle = false;
  }

  addSong(song) {
    if (!Song.isSong(song)) {
      throw new Error('Something tried to add something that isn\'t a song to the playlist');
    } else {
      this.queue.add(song);
    }
  }
  removeSong(titleOrI) {
    if (typeof titleOrI === 'number') {
      this.queue.remove(titleOrI);
    } else {
      this.queue.remove((o) => o.title == titleOrI);
    }
  }

  getNextSong() {
    if (this.shuffle) {
      return this.queue.randomNext();
    } else {
      return this.queue.next();
    }
  }
  getQueue() {
    return this.queue.collection;
  }
  clear() {
    this.queue.clear();
  }

  get shuffle() { return this._shuffle; }
  set shuffle(v) {
    if (typeof v !== 'boolean') {
      throw new Error(`Something tried to set Playlist#shuffle to a ${typeof v}, it should be a boolean`);
    } else {
      this._shuffle = v;
    }
  }

  get looping() { return this.queue.looping; }
  set looping(v) { this.queue.looping = v; }
}

if (typeof module.exports !== 'undefined') module.exports = Playlist;
