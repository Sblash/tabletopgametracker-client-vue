<template>
    <div class="row">
      <div class="col-md-12">
        <Adder :path="path_group_create" :text="text_group_create"/>
        <Group :group="group" v-for="group in groups" :key="group" />
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import Group from '../../components/Group.vue';
import Adder from '../../components/Adder.vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Groups',
  data() {
    return {
      groups: [],
      path_group_create: "/group/create",
      text_group_create: "Crea gruppo"
    }
  },
  components: {
    Group,
    Adder
  },
  methods: {
    getGroups() {
      axios
        .get("groups")
        .then((response) => {
          if (response.data.success) {
            this.groups = response.data.groups;
          }
        })
        .catch((error) => {
          console.log("ERROR_groups", error);
        });
    },
  },
  created() {
    this.getGroups();
  }
});
</script>

<style scoped>

</style>