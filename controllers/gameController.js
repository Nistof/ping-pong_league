const gameModel = require('../models/game');

module.exports = {
  gameList: (req, res) => {
    gameModel
      .getAll()
      .then(games => res.status(200).send(games))
      .catch(() => res.sendStatus(500));
  },
  addGame: (req, res) => {
    const game = req.body;
    if (game && game.player1 && game.player1.id &&
        game.player2 && game.player2.id && game.sets) {
      gameModel
        .createGame(game.player1, game.player2, game.sets)
        .then(createdGame => res.status(200).send(createdGame))
        .catch(() => res.sendStatus(500));
    } else {
      res.sendStatus(400); // Bad request
    }
  },
  getGame: (req, res) => {
    const { id } = req.params;

    gameModel
      .get(id)
      .then(game => res.status(200).send(game))
      .catch(() => res.sendStatus(500));
  },
  deleteGame: (req, res) => {
    const { id } = req.params;

    gameModel
      .deleteGame(id)
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  },
};
