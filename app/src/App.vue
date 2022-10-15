<template>
    <div class="app">
        <Header v-if="!isLoginPage"/>
        <router-view></router-view>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';

export default defineComponent({
  name: 'App',
  components: {
    RouterView,
    Header
  },
  computed: {
    isLoginPage() {
      let path = window.location.pathname;
      return path == "/";
    }
  }
});
</script>

<style scoped>
.app {
  padding-left: 16px;
  padding-right: 16px;
}
</style>