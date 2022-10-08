<template>
    <div>
        <h1>dshsajkdhsaj</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Groups',
  data() {
    return {
        groups: []
    }
  },
  components: {
    
  },
  methods: {
    getGroups() {
      axios
        .get("groups")
        .then((response) => {
          this.groups = response.data;
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