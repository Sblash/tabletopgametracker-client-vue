<template>
  <div class="row page" @click="goToPage(page.slug)">
    <div class="col-md-12 text">
      <div class="separator"><img class="page_img" :src="getImageUrl" /></div>
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
  computed: {
    getImageUrl() {
      if (this.page && this.page.profile_pic !== "") {
        return this.page.profile_pic;
      }
      return "https://via.placeholder.com/500x499";
    }
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
  background-color: lightgoldenrodyellow;
  box-shadow: 1px 1px 5px;
  padding: 8px;
  max-height: 90px;
  cursor: pointer;
  margin-bottom: 16px;
}

.page_img {
  border-radius: 50px;
  width: 70px;
  height: 70px;
}

.page_name {
  font-size: 30px;
  line-height: 2.2;
}
</style>
