<template>
  <div id="app">
    <h1>Ping Pong League</h1>
    <ScoreBoard/>
    <PlayerForm/>
    <GameForm/>
    <LatestGames/>
  </div>
</template>

<script>
import ScoreBoard from './components/ScoreBoard';
import PlayerForm from './components/PlayerForm';
import GameForm from './components/GameForm';
import LatestGames from './components/LatestGames';

export default {
  name: 'App',
  components: {
    ScoreBoard,
    PlayerForm,
    GameForm,
    LatestGames,
  },
};
</script>

<style lang="scss" scoped>
#app h1 {
  text-align: center;
}
</style>

<style lang="scss">
// General style
body {
  width: 100%;
  height: 100%;
  background-color: #375164;
  color: white;
}

.btn {
  background-color: #ac2c2c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 15px 32px;
  text-decoration: none;
  outline: none;
}

.btn:hover {
  background-color: #8a2020;
}
</style>
