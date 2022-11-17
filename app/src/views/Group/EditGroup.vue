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
          <UserPicker v-if="group.users" :existing_users="group.users" @usersPicked="updateUsersPicked($event)"/>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <button type="button" class="btn btn-outline-primary" @click="updateGroup()"><i class="bi bi-save"></i> Aggiorna</button>
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
import UserPicker from '../../components/UserPicker.vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'EditGroup',
  data() {
    return {
      group: {
        name: "",
        members: []
      },
      message: "",
      headerBgVariant: "success",
      showModal: false,
      group_slug: ""
    }
  },
  components: {
    BModal,
    UserPicker
  },
  methods: {
    getGroup(group_slug: string) {
      axios
        .get("groups/group/" + group_slug)
        .then((response) => {
          if (response.data.success) {
            this.group = response.data.group;
            console.log(this.group);
          } else {
            alert(response.data.message);
            this.$router.back();
          }
        })
        .catch((error) => {
            console.log("ERROR_group", error);
        });
    },
    updateGroup() {
      axios
        .put("groups/update", this.group)
        .then((response) => {
          if (response.data.success) {
            this.message = "Gruppo aggiornato con successo.";
          } else {
            this.message = "Errore durante l'aggiornamento del gruppo.";
          }
          this.showModal = true;
        })
        .catch((error) => {
          console.log("ERROR_group", error);
          this.message = "[ERROR_group] Errore durante l'aggiornamento del gruppo. " + error.response.data.error;
          this.headerBgVariant = "warning";
          this.showModal = true;
        });
    },
    updateUsersPicked(event: any) {
      this.group.members = event;
    }
  },
  watch: {
    '$route'(currentRoute) {
      this.group_slug = currentRoute.params.slug;
    }
  },
  created() {
    this.group_slug = String(this.$route.params.slug);
    this.getGroup(this.group_slug);
  }
});
</script>

<style scoped>
.modal-title {
  color: white !important;
}
</style>