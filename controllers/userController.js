const userModel = require('../models/user');
const gameModel = require('../models/game');

module.exports = {
  userList: (req, res) => {
    userModel
      .getAll()
      .then(users => res.status(200).send(users))
      .catch(() => res.sendStatus(500));
  },
  addUser: (req, res) => {
    const user = req.body;
    if (user && user.name) {
      userModel
        .createUser(user.name)
        .then(createdUser => res.status(200).send(createdUser))
        .catch(() => res.sendStatus(500));
    } else {
      res.sendStatus(400); // Bad request
    }
  },
  getUser: (req, res) => {
    const { id } = req.params;
    userModel
      .get(id)
      .then(user => res.status(200).send(user))
      .catch(() => res.sendStatus(500));
  },
  getUserPoints: (req, res) => {
    const { id } = req.params;
    gameModel
      .getUserPoints(id)
      .then(points => res.status(200).send(points))
      .catch(() => res.sendStatus(500));
  },
  getWin: (req, res) => {
    const { id } = req.params;

    gameModel
      .getWin(id)
      .then(win => res.status(200).send(win))
      .catch(() => res.sendStatus(500));
  },
  getLose: (req, res) => {
    const { id } = req.params;
    gameModel
      .getLose(id)
      .then(lose => res.status(200).send(lose))
      .catch(() => res.sendStatus(500));
  },
};
