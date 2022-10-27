<template>
  <div class="row header">
    <div class="btn-group" role="group">
      <div class="col-md-1" v-if="pathname !== '/groups'">
        <button type="button" class="btn btn-outline-secondary" @click="back()"><i class="bi bi-arrow-left"></i></button>
      </div>
      <div class="col-md-11">
        <router-link to="/groups"><h2>Tabletop game tracker</h2></router-link>
      </div>
      <!-- <div class="col-md-1">
        <button id="menu" type="button" class="btn btn-outline-secondary" data-bs-toggle="collapse" data-bs-target="#menu-collapse" aria-expanded="false" aria-controls="menu-collapse"></button>
      </div> -->
    </div>
    <!-- <div class="collapse" id="menu-collapse">
      <div class="card card-body">
        Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
      </div>
    </div> -->
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
  },
  data() {
    return {
      pathname: ""
    }
  },
  watch: {
    '$route'(currentRoute) {
      this.pathname = currentRoute.path;
    }
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  border-bottom: 1px solid black;
  margin-bottom: 16px;
}

button:first-child {
  margin-right: 16px;
  margin-bottom: 8px;
}

/* #menu {
  position: absolute;
  right: 0;
  margin-top: 5px;
} */
</style>
