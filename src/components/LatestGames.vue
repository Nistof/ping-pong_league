<template>
  <div class="latest-games">
    <h2>Latest Games</h2>
    <div v-for="game in games" v-bind:key="game.id">
      <div>
        <span class="player">{{game.player1.name}}</span>
        {{gameScoreP1(game)}} - {{gameScoreP2(game)}}
        <span class="player">{{game.player2.name}}</span>
      </div>
      <div>
        <ul>
          <!-- eslint-disable-next-line vue/require-v-for-key -->
          <li v-for="set in game.sets">{{set.score1}}-{{set.score2}}</li>
        </ul>
      </div>
      <button class="btn" v-on:click="deleteGame(game)">x</button>
    </div>
  </div>
</template>

<script>
import store from '../store';

export default {
  name: 'LatestGames',
  store,
  computed: {
    games: {
      get() {
        return this.$store.state.games;
      },
    },
  },
  methods: {
    gameScoreP1(game) {
      return game.sets.reduce((acc, current) => acc + (current.score1 > current.score2 ? 1 : 0), 0);
    },
    gameScoreP2(game) {
      return game.sets.reduce((acc, current) => acc + (current.score2 > current.score1 ? 1 : 0), 0);
    },
    deleteGame(game) {
      this.$store.commit('deleteGame', game);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
