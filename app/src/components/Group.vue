<template>
  <div class="row group" @click="goToGroup(group.slug)">
    <div class="col-md-12 text">
      <div class="separator"><img class="group_img" src="https://via.placeholder.com/500x499" /></div>
      <span class="group_name">{{ group.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Group',
  props: {
    group: Object
  },
  methods: {
    goToGroup(slug: string) {
      this.$router.push("/group/details/" + slug);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.group {
  border-radius: 20px;
  background-color: lightgoldenrodyellow;
  box-shadow: 1px 1px 5px;
  padding: 8px;
  max-height: 90px;
  cursor: pointer;
}

.group_img {
  border-radius: 50px;
  width: 70px;
  height: 70px;
}

.group_name {
  font-size: 30px;
  line-height: 2.2;
}
</style>
