<template>
    <div class="row">
      <div class="col-md-12">
        <Adder :path="pathCreate()" :text="text_create"/>
        <Game :game="game" v-for="game in games" :key="game" />
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import Game from '../../components/Game.vue';
import Adder from '../../components/Adder.vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Group',
  data() {
    return {
        games: [],
        group_slug: "",
        text_create: "Crea gioco"
    }
  },
  components: {
    Game,
    Adder
  },
  methods: {
    pathCreate() {
      return "/group/" + this.group_slug + "/create-game";
    },
    getGames(group_slug: string) {
        axios
            .get("games/" + group_slug)
            .then((response) => {
                if (response.data.success) {
                    this.games = response.data.games;
                } else {
                    alert(response.data.message);
                    this.$router.back();
                }
            })
            .catch((error) => {
                console.log("ERROR_games", error);
            });
    },
  },
  watch: {
    '$route'(currentRoute) {
        this.group_slug = currentRoute.params.slug;
        
    }
  },
  created() {
    this.group_slug = String(this.$route.params.slug);
    this.getGames(this.group_slug);
  }
});
</script>

<style scoped>

</style>