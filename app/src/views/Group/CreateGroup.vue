<template>
    <div class="row">
      <div class="col-md-12">
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'CreateGroup',
  data() {
    return {
        game: {}
    }
  },
  components: {
    Game
  },
  methods: {
    
  },
  created() {
    // this.getGames(this.group_slug);
  }
});
</script>

<style scoped>

</style>