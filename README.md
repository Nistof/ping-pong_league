# ping-pong_league

## Package used
### Express

Express allows to setup a minimalistic Web infrastructure and is commonly used when a NodeJS server is needed. It is a very simple
way to make a server side web application.

### neDB

neDB is a persistent noSQL database which stores data in files (Like SQLite) and its API is a subset of MongoDB's. 
It is quite easy to use and really efficient.

### VueJS

A very popular open-source javascript library to build user interfaces.

### VueX

VueX is a state management pattern and a library for VueJS applications. It is usefull to share data accross components.

### eslint

A linter to ensure that the code produced is clean and easy to read.

## Instructions

First, you need to install dependencies with the following command :
```
npm install
```

The interface has to be built before running the server :
```
npm run build
```

To launch the server :
```
node server.js
```

## Endpoints

### GET /api/users

Get the list of all users.

### PUT /api/users

Creates a user.

The body of this request should follow this structure :

```
{
  "name": "USERNAME"
}
```

### GET /api/users/:id

Get a specific user given its id.

The structure of what is returned by this request is as follow :
```
{
  "name": "USERNAME"
  "_id"; "USER ID"
}
```

### GET /api/users/win/:id

Get the number of win of a user.

### GET /api/users/lose/:id

Get the number of lose of a user.

### GET /api/users/points/:id

Get the number of points of a user.

### GET /api/games

Get the list of all existing games.

### PUT /api/games

Creates a game.

The body of this request should follow this structure :

```
{
  "player1": {
    "id": "USER ID"
  },
  "player2": {
    "id": "USER ID"
  },
  "sets": [
    [SCORE_USER1, SCORE_USER2],
    ...
  ]
}
```

### GET /api/games/:id

Get a specific game.

The structure of what is returned by this request is as follow :
```
{
  "player1": {
    "id": "USER ID"
  },
  "player2": {
    "id": "USER ID"
  },
  "sets": [
    {
      "score1": SCORE_USER1,
      "score2": SCORE_USER2
    },
    ...
  ],
  "_id": "USER ID"
}
```

### DELETE /api/games/:id

Delete a game given its id.
