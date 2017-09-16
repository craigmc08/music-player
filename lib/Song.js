const songIdentifier = 'musicplayer#song';

class Song {
  constructor(title) {
    this.songIdentifier = 'musicplayer#song';

    this.title = title;
  }

  static isSong(song) {
    return song.songIdentifier === songIdentifier;
  }
}

if (typeof module.exports !== 'undefined') module.exports = Song;
