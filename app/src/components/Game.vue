<template>
  <div class="row game" @click="goToGame(game.slug)">
    <div class="col-md-12 text">
      <div class="separator"><img class="game_img" :src="getImageUrl" /></div>
      <span class="game_name">{{ game.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Game',
  props: {
    game: Object
  },
  computed: {
    getImageUrl() {
      if (this.game && this.game.profile_pic !== "") {
        return this.game.profile_pic;
      }
      return "https://via.placeholder.com/500x499";
    }
  },
  methods: {
    goToGame(slug: string) {
      this.$router.push("/game/" + slug);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.game {
  border-radius: 20px;
  background-color: lightgoldenrodyellow;
  box-shadow: 1px 1px 5px;
  padding: 8px;
  max-height: 90px;
}

.game_img {
  border-radius: 50px;
  width: 70px;
  height: 70px;
}

.game_name {
  font-size: 30px;
  line-height: 2.2;
}
</style>
