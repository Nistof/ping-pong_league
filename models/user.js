const DataStore = require('nedb');

const db = new DataStore({ filename: './database/users.db', autoload: true });

class User {
  constructor(name) {
    this.name = name;
  }
}

const createUser = (name) => {
  const user = new User(name);

  return new Promise((resolve, reject) => {
    db.findOne({ name }, (err, foundUser) => {
      if (err) reject(Error('Internal error'));
      else if (foundUser) resolve(foundUser);
      else {
        db.insert(user, (insertErr, createdUser) => {
          if (insertErr) reject(Error('Internal error'));
          else resolve(createdUser);
        });
      }
    });
  });
};

const getAll = () =>
  new Promise((resolve, reject) => {
    db.find({}, (err, users) => {
      if (err) reject(Error('Internal error'));
      else resolve(users);
    });
  });

const get = id =>
  new Promise((resolve, reject) => {
    db.findOne({ _id: id }, (err, user) => {
      if (err) reject(Error('Internal error'));
      else if (!user) reject(Error('User not found'));
      else resolve(user);
    });
  });

module.exports = {
  createUser,
  getAll,
  get,
};
