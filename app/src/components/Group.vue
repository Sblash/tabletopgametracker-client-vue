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
      this.$router.push("/group/" + slug + "/games");
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.group {
  border-radius: 20px;
  border: 1px solid grey;
  background-color: white;
  padding: 8px;
  max-height: 90px;
  cursor: pointer;
  margin-bottom: 16px;
}

.group_img {
  border-radius: 50px;
  width: 70px;
  height: 70px;
}

.group_name {
  font-size: 25px;
  line-height: 2.2;
}
</style>
