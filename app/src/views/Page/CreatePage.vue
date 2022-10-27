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
          <button type="button" class="btn btn-outline-primary" @click="createGame()"><i class="bi bi-save"></i> Crea</button>
        </div>
      </div>

      <b-modal v-model="showModal" :header-bg-variant="headerBgVariant" title="Info" ok-only ok-title="Chiudi" centered @ok="onHidden">
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
  name: 'CreatePage',
  data() {
    return {
      game: {
        name: "",
        profile_pic: "",
        group_slug: ""
      },
      message: "",
      headerBgVariant: "success",
      showModal: false
    }
  },
  components: {
    BModal
  },
  methods: {
    createGame() {
      axios
        .post("games/create", this.game)
        .then((response) => {
          if (response.data.success) {
            this.message = "Gioco creato con successo.";
          } else {
            this.message = "Errore durante la creazione del gioco.";
          }
          this.showModal = true;
        })
        .catch((error) => {
          console.log("ERROR_game", error);
          this.message = "Errore durante la creazione del gioco. " + JSON.stringify(error);
          this.headerBgVariant = "warning";
          this.showModal = true;
        });
    },
    onHidden() {
      this.$router.back();
    }
  },
  watch: {
    '$route'(currentRoute) {
      this.game.group_slug = currentRoute.params.slug;
    }
  },
  created() {
    this.game.group_slug = String(this.$route.params.slug);
  }
});
</script>

<style scoped>
.modal-title {
  color: white !important;
}
</style>