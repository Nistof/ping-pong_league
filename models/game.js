const DataStore = require('nedb');
const userModel = require('./user');

const db = new DataStore({ filename: './database/games.db', autoload: true });

class Set {
  constructor(score1, score2) {
    this.score1 = score1;
    this.score2 = score2;
  }
}

class Game {
  constructor(player1, player2, sets) {
    this.player1 = player1;
    this.player2 = player2;
    this.sets = sets;
  }
}

const getAll = () =>
  new Promise((resolve, reject) => {
    db.find({}, (err, games) => {
      if (err) reject(Error('Internal error'));
      else resolve(games);
    });
  });

const get = id =>
  new Promise((resolve, reject) => {
    db.findOne({ _id: id }, (err, game) => {
      if (err) reject(Error('Internal error'));
      else if (!game) reject(Error('User not found'));
      else resolve(game);
    });
  });

const createGame = (player1, player2, sets) => {
  const user1Promise = userModel.get(player1.id);
  const user2Promise = userModel.get(player2.id);

  return Promise.all([
    user1Promise,
    user2Promise,
  ]).then(([user1, user2]) => {
    const mappedSets = sets.map(set => new Set(set[0], set[1]));

    return new Promise((resolve, reject) => {
      // Check if all sets are valid
      mappedSets.forEach((set) => {
        if (set.score1 === undefined || set.score2 === undefined) reject(Error('Invalid set'));
      });

      // Create the game
      const game = new Game(user1, user2, mappedSets);
      db.insert(game, (err, createdGame) => {
        if (err) reject(Error('Internal error'));
        else resolve(createdGame);
      });
    });
  });
};

const deleteGame = id =>
  new Promise((resolve, reject) =>
    db.remove({ _id: id }, (err, n) => {
      if (err) reject(Error('Internal error'));
      else resolve(n);
    }));

const getWinRate = (player) => {

};

module.exports = {
  getAll,
  get,
  createGame,
  deleteGame,
  getWinRate,
};
