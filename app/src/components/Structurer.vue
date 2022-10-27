<template>
  <div class="row structurer">
    <div class="col-md-12">

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Structurer',
  props: {

  },
  computed: {
    
  },
  methods: {
    
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.structurer {
  border-radius: 20px;
  border: 1px dashed grey;
  background-color: lightgray;
  padding: 8px;
  max-height: 90px;
  cursor: pointer;
  margin-bottom: 16px;
}

.structurer_img {
  border-radius: 50px;
  width: 70px;
  height: 70px;
}

.structurer_name {
  font-size: 30px;
  line-height: 2.2;
}
</style>
