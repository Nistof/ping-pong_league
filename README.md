# ping-pong_league

## Package used
### Express

Express allow to setup a minimalistic Web infrastructure and is used a lot when a NodeJS server is needed.

### neDB

neDB is a persistent noSQL database and its API is a subset of MongoDB's. 
It is quite easy to use and really efficient.

### eslint

A linter to ensure that the code produced is clean and easy to read.

## Instructions

First, you need to install dependencies with the following command :
```
npm install
```

To launch the server :
```
node server.js
```

By default, the server is launched on the port 3000, but you can change it by setting the ```PING_PONG_SERVER_PORT```.

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
