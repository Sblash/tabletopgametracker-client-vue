<template>
  <div class="row">
    <div class="col-md-12">
      <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default">Nome elemento</span>
        <input v-model="element.name" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
      </div>
      <select class="form-select" aria-label="Default select example">
        <option selected>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Element} from '../interfaces/Structure';

export default defineComponent({
  name: 'ElementConstructor',
  props: {
    page_slug: String,
    rowIndex: Number,
    colIndex: Number
  },
  data() {
    const element: Element = {
      name: "",
      type: "",
      page_slug: this.page_slug
    };

    return {
      element: element
    }
  }
})
</script>

<style scoped>
</style>