<template>
    <div class="row">
      <div class="row">
        <div class="col-md-12">
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Nome gioco</span>
            <input v-model="game.name" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Img gioco</span>
            <input v-model="game.profile_pic" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <button type="button" class="btn btn-outline-primary" @click="updateGame()"><i class="bi bi-save"></i> Aggiorna</button>
        </div>
      </div>

      <b-modal v-model="showModal" :header-bg-variant="headerBgVariant" title="Info" ok-only ok-title="Chiudi" centered>
        <p>{{ message }}</p>
      </b-modal>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { BModal } from 'bootstrap-vue-3';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'EditGame',
  data() {
    return {
      game: {
        name: "",
        profile_pic: "",
        group_slug: ""
      },
      message: "",
      headerBgVariant: "success",
      showModal: false,
      game_slug: ""
    }
  },
  components: {
    BModal
  },
  methods: {
    getGame(game_slug: string) {
      axios
        .get("games/game/" + game_slug)
        .then((response) => {
          if (response.data.success) {
            this.game = response.data.game;
          } else {
            alert(response.data.message);
            this.$router.back();
          }
        })
        .catch((error) => {
            console.log("ERROR_game", error);
        });
    },
    updateGame() {
      axios
        .put("games/update", this.game)
        .then((response) => {
          if (response.data.success) {
            this.message = "Gioco aggiornato con successo.";
          } else {
            this.message = "Errore durante l'aggiornamento del gioco.";
          }
          this.showModal = true;
        })
        .catch((error) => {
          console.log("ERROR_game", error);
          this.message = "[ERROR_game] Errore durante l'aggiornamento del gioco. " + error.response.data.error;
          this.headerBgVariant = "warning";
          this.showModal = true;
        });
    }
  },
  watch: {
    '$route'(currentRoute) {
      this.game_slug = currentRoute.params.slug;
    }
  },
  created() {
    this.game_slug = String(this.$route.params.slug);
    this.getGame(this.game_slug);
  }
});
</script>

<style scoped>
.modal-title {
  color: white !important;
}
</style>