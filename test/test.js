const assert = require('assert');
const Playlist = require('../lib/Playlist');
const Queue = require('../lib/Queue');
const Song = require('../lib/Song');

const pl1 = new Playlist();

const song1 = new Song('song 1');
const song2 = new Song('song 2');

describe('Playlist', ()=>{
  describe('#addSong', ()=>{
    it('should add a song to the queue', ()=>{
      pl1.addSong(song1);
      assert.equal('song 1', pl1.queue.collection[0].title);
      pl1.addSong(song2);
      assert.equal('song 2', pl1.queue.collection[1].title);

      pl1.clear();
    });
  });
  describe('#removeSong', ()=>{
    it('should remove a song by index', ()=>{
      pl1.addSong(song1);
      pl1.removeSong(0);
      assert.equal(-1, pl1.queue.collection.indexOf(song1));

      pl1.clear();
    });
    it('should remove a song by title', ()=>{
      pl1.addSong(song2);
      pl1.removeSong('song 2');
      assert.equal(-1, pl1.queue.collection.indexOf(song2));

      pl1.clear();
    });
  });
  describe('#getNextSong', ()=>{
    it('should give the next song in the queue and remove the song from the queue', ()=>{
      pl1.addSong(song1);
      assert.equal(song1, pl1.getNextSong(), 'return the next song');
      assert.equal(-1, pl1.queue.activeCollection.indexOf(song1), 'remove the song from the queue');

      pl1.clear();
    });
  });
  describe('#getQueue', ()=>{
    it('should return an array of the songs in the queue', ()=>{
      pl1.addSong(song1);
      assert.equal(song1, pl1.getQueue()[0]);
      pl1.queue._queue = [];

      pl1.clear();

      pl1.addSong(song2);
      pl1.addSong(song1);
      assert.equal([song2, song1][0], pl1.getQueue()[0]);
      assert.equal([song2, song1][1], pl1.getQueue()[1]);
      pl1.queue._queue = [];

      pl1.clear();
    });
  });
});
