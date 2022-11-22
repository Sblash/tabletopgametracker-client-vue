<template>
  <div class="row page" @click="goToPage(page.slug)">
    <div class="col-md-12 text">
      <span class="page_name">{{ page.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Page',
  props: {
    page: Object
  },
  methods: {
    goToPage(slug: string) {
      this.$router.push("/page/" + slug);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page {
  border-radius: 20px;
  border: 1px solid grey;
  background-color: white;
  padding: 8px;
  max-height: 90px;
  cursor: pointer;
  margin-bottom: 16px;
}

.page_name {
  font-size: 25px;
  line-height: 2.2;
}
</style>
