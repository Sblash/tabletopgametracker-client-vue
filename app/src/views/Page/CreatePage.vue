<template>
    <div class="row">
      <div class="row">
        <div class="col-md-12">
          <h3>Dettagli</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Nome pagina</span>
            <input v-model="page.name" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h3>Struttura</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <Structurer @structure="updateStructure"/>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <button type="button" class="btn btn-outline-primary" @click="createPage()"><i class="bi bi-save"></i> Crea</button>
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
import Structurer from '../../components/Structurer.vue';
import { Structure } from '../../interfaces/Structure';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'CreatePage',
  data() {
    return {
      page: {
        name: "",
        game_slug: "",
        structure: {}
      },
      message: "",
      headerBgVariant: "success",
      showModal: false,
      error: false
    }
  },
  components: {
    Structurer
  },
  methods: {
    createPage() {
      axios
        .post("pages/create", this.page)
        .then((response) => {
          if (response.data.success) {
            this.createElements(response.data.page.slug);
            this.error = false;
          } else {
            this.message = "Errore durante la creazione della pagina.";
          }
          this.showModal = true;
        })
        .catch((error) => {
          console.log("ERROR_page", error);
          this.message = "[ERROR_page] Errore durante la creazione della pagina. " + JSON.stringify(error);
          this.headerBgVariant = "warning";
          this.showModal = true;
          this.error = true;
        });
    },
    createElements(page_slug: string) {
      let params = {
        page_slug: page_slug,
        structure: this.page.structure
      };

      axios
        .post("elements/create-from-structure", params)
        .then((response) => {
          if (response.data.success) {
            this.message = "pagina creata con successo.";
            this.headerBgVariant = "success";
            this.error = false;
          } else {
            this.message = "Errore durante la creazione della pagina.";
            this.headerBgVariant = "warning";
            this.error = true;
          }
          this.showModal = true;
        })
        .catch((error) => {
          console.log("ERROR_page_elements", error);
          this.message = "[ERROR_page_elements] Errore durante la creazione della pagina. " + JSON.stringify(error);
          this.headerBgVariant = "warning";
          this.showModal = true;
          this.error = true;
        });
    },
    onHidden() {
      this.$router.back();
    },
    updateStructure(value: Structure) {
      this.page.structure = value;
    }
  },
  watch: {
    '$route'(currentRoute) {
      this.page.game_slug = currentRoute.params.slug;
    }
  },
  created() {
    this.page.game_slug = String(this.$route.params.slug);
  }
});
</script>

<style scoped>
.modal-title {
  color: white !important;
}

h3 {
  border-bottom: 1px solid black;
}
</style>