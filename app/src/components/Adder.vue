<template>
  <div class="row adder" @click="goToCreatePath(path)">
    <div class="col-md-12">
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Adder',
  props: {
    path: String,
    text: String
  },
  methods: {
    goToCreatePath(path: string) {
      this.$router.push(path);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.adder {
  border-radius: 20px;
  border: 1px dashed grey;
  background-color: lightgrey;
  padding: 8px;
  max-height: 90px;
  font-size: 30px;
  margin-bottom: 16px;
  text-align: center;
  cursor: pointer;
}
</style>
