<template>
  <div class="score-board">
    <table>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Won</th>
        <th>Lost</th>
        <th>Winning %</th>
        <th>Points</th>
      </tr>
      <tr v-for="(player, index) in players" v-bind:key="player.id">
        <td>{{index + 1}}</td>
        <td>{{player.name}}</td>
        <td>{{player.win}}</td>
        <td>{{player.lose}}</td>
        <td>{{100. * player.win / (player.win + player.lose > 0 ? player.win + player.lose : 1)}} %</td>
        <td>{{player.points}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import store from '../store';

export default {
  name: 'ScoreBoard',
  store,
  computed: {
    players: {
      get() {
        const users = this.$store.state.users;
        return users
          .sort((a, b) => a.points < b.points)
          .filter((value, index) => index < 5);
      },
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
