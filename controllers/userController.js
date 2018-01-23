const userModel = require('../models/user');

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
};
