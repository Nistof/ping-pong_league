<template>
  <div class="game-form">
    <h2>Add Games</h2>
    <select v-model="player1">
      <option v-for="player in players" v-bind:value="player" v-bind:key="'p1' + player.id">
        {{ player.name }}
      </option>
    </select>
    <div class="vs">VS</div>

    <select v-model="player2">
      <option v-for="player in players" v-bind:value="player" v-bind:key="'p2' + player.id">
        {{ player.name }}
      </option>
    </select>

    <h3>Score</h3>
    <!-- eslint-disable-next-line vue/require-v-for-key -->
    <div v-for="set in sets">
      <input type="number" v-bind:value="set[0]" v-model="set[0]"/>
      <input type="number" v-bind:value="set[1]" v-model="set[1]"/>
    </div>

    <button class="btn" v-on:click="addSet">Add Set</button>
    <button class="btn" v-on:click="addGame">Add Game</button>
  </div>
</template>

<script>
import store from '../store';

export default {
  name: 'GameForm',
  store,
  data() {
    return {
      player1: '',
      player2: '',
      sets: [
        [0, 0],
      ],
    };
  },
  computed: {
    players: {
      get() {
        return this.$store.state.users;
      },
    },
  },
  methods: {
    addSet() {
      this.sets.push([0, 0]);
    },
    addGame() {
      if (this.player1 && this.player2 && this.player1 !== this.player2) {
        console.log(this.sets);
        this.$store.commit('addGame',
          {
            player1: this.player1,
            player2: this.player2,
            sets: this.sets.map(set => set.map(value => parseInt(value))),
          },
        );

        this.player1 = '';
        this.player2 = '';
        this.sets = [[0, 0]];
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
