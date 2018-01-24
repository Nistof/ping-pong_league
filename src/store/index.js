/* eslint no-underscore-dangle: off, no-return-assign: off */

import Vue from 'vue';
import Vuex from 'vuex';

import Axios from 'axios';

import User from './objects/user';
import Game from './objects/game';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    users: [],
    games: [],
  },
  actions: {
    retrieveData(context) {
      context.commit('retrieveUsers');
      context.commit('retrieveGames');
    },
  },
  mutations: {
    retrieveUsers(state) {
      Axios
        .get('http://localhost:3000/api/users')
        .then((res) => {
          const users = res.data;

          const promises = users.map(user =>
            Promise.all([
              Axios.get(`http://localhost:3000/api/users/win/${user._id}`),
              Axios.get(`http://localhost:3000/api/users/lose/${user._id}`),
              Axios.get(`http://localhost:3000/api/users/points/${user._id}`),
            ]).then(([resWin, resLose, resPoints]) =>
              new User(
                user._id,
                user.name,
                resWin.data.win,
                resLose.data.lose,
                resPoints.data.points)));
          return Promise.all(promises);
        })
        .then(users => state.users = users);
    },
    retrieveGames(state) {
      Axios
        .get('http://localhost:3000/api/games')
        .then((res) => {
          const games = res.data;
          state.games = games.map(game =>
            new Game(
              game._id,
              game.player1,
              game.player2,
              game.sets));
        });
    },
    addUser(state, obj) {
      Axios
        .put('http://localhost:3000/api/users', { name: obj.name })
        .then((res) => {
          const user = res.data;
          state.users.push(new User(user._id, user.name, 0, 0, 0));
        });
    },
    addGame(state, obj) {
      Axios
        .put(
          'http://localhost:3000/api/games',
          {
            player1: obj.player1,
            player2: obj.player2,
            sets: obj.sets,
          },
        )
        .then((res) => {
          const game = res.data;
          state.games.push(new Game(
            game._id,
            game.player1,
            game.player2,
            game.sets));

          state.updateUser(state, game.player1);
          state.updateUser(state, game.player2);
        });
    },
    deleteGame(state, obj) {
      state.games = state.games.filter(value => value.id !== obj.id);
      Axios.delete(`http://localhost:3000/api/games/${obj.id}`);
    },
    updateUser(state, obj) {
      // Remove user
      state.users = state.users.filter(value => value.id !== obj._id);

      Promise.all([
        Axios.get(`http://localhost:3000/api/users/win/${obj._id}`),
        Axios.get(`http://localhost:3000/api/users/lose/${obj._id}`),
        Axios.get(`http://localhost:3000/api/users/points/${obj._id}`),
      ]).then(([resWin, resLose, resPoints]) =>
        state.user.push(
          new User(
            obj._id,
            obj.name,
            resWin.data.win,
            resLose.data.lose,
            resPoints.data.points)));
    },
  },
});

export default store;
