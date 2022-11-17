<template>
    <div class="row">
      <div class="row">
        <div class="col-md-12">
          <h3 class="title_section">Dettagli</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Nome gruppo</span>
            <input v-model="group.name" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Img gruppo</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h3 class="title_section">Utenti</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <UserPicker @usersPicked="updateUsersPicked($event)"/>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <button type="button" class="btn btn-outline-primary" @click="createGroup()"><i class="bi bi-save"></i> Crea</button>
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
import UserPicker from '../../components/UserPicker.vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'CreateGroup',
  data() {
    return {
      group: {
        name: "",
        members: []
      },
      message: "",
      headerBgVariant: "success",
      showModal: false,
      error: false
    }
  },
  components: {
    BModal,
    UserPicker
  },
  methods: {
    createGroup() {
      axios
        .post("groups/create", this.group)
        .then((response) => {
          if (response.data.success) {
            this.message = "Gruppo creato con successo.";
            this.headerBgVariant = "success";
            this.error = false;
          } else {
            this.message = "Errore durante la creazione del gruppo. Errore:" + response.data.message;
            this.headerBgVariant = "warning";
            this.error = true;
          }
          this.showModal = true;
        })
        .catch((error) => {
          console.log("ERROR_groups", error);
          this.message = "Errore durante la creazione del gruppo. " + error.response.data.message;
          this.headerBgVariant = "warning";
          this.showModal = true;
          this.error = true;
        });
    },
    onHidden() {
      if (!this.error) this.$router.back();
    },
    updateUsersPicked(event: any) {
      this.group.members = event;
    }
  }
});
</script>

<style scoped>
.modal-title {
  color: white !important;
}
</style>