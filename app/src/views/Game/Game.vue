<template>
    <div class="row">
      <div class="col-md-12">
        <Adder :path="pathCreate()" :text="text_create"/>
        <Page :page="page" v-for="page in pages" :key="page" />
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import Page from '../../components/Page.vue'
import Adder from '../../components/Adder.vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Game',
  data() {
    return {
        pages: [],
        game_slug: "",
        text_create: "Crea pagina"
    }
  },
  components: {
    Page,
    Adder
  },
  methods: {
    pathCreate() {
      return "/game/" + this.game_slug + "/create-page";
    },
    getPages(game_slug: string) {
        axios
            .get("pages/" + game_slug)
            .then((response) => {
                if (response.data.success) {
                    this.pages = response.data.pages;
                } else {
                    alert(response.data.message);
                    this.$router.back();
                }
            })
            .catch((error) => {
                console.log("ERROR_pages", error);
            });
    },
  },
  watch: {
    '$route'(currentRoute) {
      this.game_slug = currentRoute.params.slug;
    }
  },
  created() {
    this.game_slug = String(this.$route.params.slug);
    this.getPages(this.game_slug);
  }
});
</script>

<style scoped>

</style>