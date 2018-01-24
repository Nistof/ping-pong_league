<template>
  <div class="player-form">
    <h2>Add a new player</h2>
    <input name="username" v-model="username" placeholder="e.g. Jimbo"/>
    <button class="btn" v-on:click="createPlayer">Add Player</button>
  </div>
</template>

<script>
import store from '../store';

export default {
  name: 'PlayerForm',
  store,
  data() {
    return {
      username: '',
    };
  },
  methods: {
    createPlayer() {
      if (this.username) {
        this.$store.commit('addUser', { name: this.username });
        this.username = '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
