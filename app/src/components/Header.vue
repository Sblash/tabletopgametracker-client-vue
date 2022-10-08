<template>
  <div class="row header">
    <div class="col-md-12">
        <router-link to="/groups"><h2>Tabletop game tracker</h2></router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  components: {
    RouterLink
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
    border-bottom: 1px solid black;
    margin-bottom: 16px;
}
</style>
