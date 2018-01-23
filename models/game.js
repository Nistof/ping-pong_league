/* eslint: no-underscore-dangle=off */

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

const userScore = (game, userId) =>
  game.sets.reduce((acc, current) => {
    if (game.player1.id === userId) {
      return acc + current.score1;
    }
    return acc + current.score2;
  }, 0);

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

const getUserScore = (gameId, userId) =>
  new Promise((resolve, reject) =>
    db.findOne({ _id: gameId }, (err, game) => {
      if (err) reject(Error('Internal error'));
      else if (!game) reject(Error('No game found'));
      else if (game.player1.id !== userId || game.player2.id !== userId) reject(Error('User not in game'));
      else {
        resolve(userScore(game, userId));
      }
    }));

const getWin = (id) => {
  // Get games where player is player1
  const gamesP1Promise = new Promise((resolve, reject) => {
    db.find({ 'player1._id': id }, (err, games) => {
      if (err) reject(Error('Internal error'));
      else resolve(games);
    });
  });

  // Get games where player is player2
  const gamesP2Promise = new Promise((resolve, reject) => {
    db.find({ 'player2._id': id }, (err, games) => {
      if (err) reject(Error('Internal error'));
      else resolve(games);
    });
  });

  return Promise.all([
    gamesP1Promise,
    gamesP2Promise,
  ]).then(([gamesP1, gamesP2]) => {
    let gamesWon = gamesP1.reduce((acc, current) => {
      const pointsP1 = userScore(current, current.player1._id);
      const pointsP2 = userScore(current, current.player2._id);
      return acc + (pointsP1 > pointsP2 ? 1 : 0);
    }, 0);

    gamesWon += gamesP2.reduce((acc, current) => {
      const pointsP1 = userScore(current, current.player1._id);
      const pointsP2 = userScore(current, current.player2._id);
      return acc + (pointsP1 < pointsP2 ? 1 : 0);
    }, 0);

    return Promise.resolve({ win: gamesWon });
  });
};

const getLose = (id) => {
  // Get games where player is player1
  const gamesP1Promise = new Promise((resolve, reject) => {
    db.find({ 'player1._id': id }, (err, games) => {
      if (err) reject(Error('Internal error'));
      else resolve(games);
    });
  });

  // Get games where player is player2
  const gamesP2Promise = new Promise((resolve, reject) => {
    db.find({ 'player2._id': id }, (err, games) => {
      if (err) reject(Error('Internal error'));
      else resolve(games);
    });
  });

  return Promise.all([
    gamesP1Promise,
    gamesP2Promise,
  ]).then(([gamesP1, gamesP2]) => {
    let gamesLose = gamesP1.reduce((acc, current) => {
      const pointsP1 = userScore(current, current.player1._id);
      const pointsP2 = userScore(current, current.player2._id);
      return acc + (pointsP1 < pointsP2 ? 1 : 0);
    }, 0);

    gamesLose += gamesP2.reduce((acc, current) => {
      const pointsP1 = userScore(current, current.player1._id);
      const pointsP2 = userScore(current, current.player2._id);
      return acc + (pointsP1 > pointsP2 ? 1 : 0);
    }, 0);

    return Promise.resolve({ lose: gamesLose });
  });
};

const getUserPoints = (id) => {
  // Get games where player is player1
  const gamesP1Promise = new Promise((resolve, reject) => {
    db.find({ 'player1._id': id }, (err, games) => {
      if (err) reject(Error('Internal error'));
      else resolve(games);
    });
  });

  // Get games where player is player2
  const gamesP2Promise = new Promise((resolve, reject) => {
    db.find({ 'player2._id': id }, (err, games) => {
      if (err) reject(Error('Internal error'));
      else resolve(games);
    });
  });

  return Promise.all([
    gamesP1Promise,
    gamesP2Promise,
  ]).then(([gamesP1, gamesP2]) => {
    let points = gamesP1.reduce((acc, current) => acc + userScore(current, current.player1._id), 0);

    points += gamesP2.reduce((acc, current) => acc + userScore(current, current.player2._id), 0);

    return Promise.resolve({ points });
  });
};

module.exports = {
  getAll,
  get,
  createGame,
  deleteGame,
  getWin,
  getLose,
  getUserScore,
  getUserPoints,
};
