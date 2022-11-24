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
          <b-form-checkbox v-model="page.is_private">Pagina privata</b-form-checkbox>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h3>Struttura</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <Structurer v-if="page.structure.rows" :existing_structure="page.structure" @structure="updateStructure"/>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <button type="button" class="btn btn-outline-primary" @click="updatePage()"><i class="bi bi-save"></i> Aggiorna</button>
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
import Structurer from '../../components/Structurer.vue';
import { Structure } from '../../interfaces/Structure';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'EditPage',
  data() {
    return {
      page: {
        name: "",
        game_slug: "",
        is_private: false,
        structure: {}
      },
      message: "",
      headerBgVariant: "success",
      showModal: false,
      page_slug: "",
      element_slugs: []
    }
  },
  components: {
    Structurer
  },
  methods: {
    getPage(page_slug: string) {
      axios
        .get("pages/page/" + page_slug)
        .then((response) => {
          if (response.data.success) {
            this.page = response.data.page;
          } else {
            alert(response.data.message);
            this.$router.back();
          }
        })
        .catch((error) => {
          console.log("ERROR_page", error);
        });
    },
    updatePage() {
      axios
        .put("pages/update", this.page)
        .then((response) => {
          if (response.data.success) {
            this.message = "Pagina aggiornata con successo.";
            this.headerBgVariant = "success";
          } else {
            this.message = "Errore durante l'aggiornamento della pagina. \nErrore: " + response.data.message;
            this.headerBgVariant = "warning";
          }
          this.showModal = true;
        })
        .catch((error) => {
          console.log("ERROR_page", error);
          this.message = "[ERROR_page] Errore durante l'aggiornamento della pagina. " + error.response.data.error;
          this.headerBgVariant = "warning";
          this.showModal = true;
        });
    },
    updateStructure(value: Structure) {
      this.page.structure = value;
    }
  },
  watch: {
    '$route'(currentRoute) {
      this.page_slug = currentRoute.params.slug;
    }
  },
  created() {
    this.page_slug = String(this.$route.params.slug);
    this.getPage(this.page_slug);
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