<template>
    <div>
        <Header />
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
  }
});
</script>