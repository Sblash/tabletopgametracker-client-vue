<template>
  <div class="row">
    <div class="col-md-12">
      <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default">Nome elemento</span>
        <input v-model="element.name" @change="update" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
      </div>
      <select @change="update" v-model="element.type" class="form-select" aria-label="Default select example">
        <option selected>Seleziona tipologia di elemento</option>
        <option value="checklist">Checklist</option>
        <option value="text">Testo</option>
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
    row_index: Number,
    col_index: Number
  },
  data() {
    let element: Element = {
      name: "",
      type: "",
      page_slug: this.page_slug,
      row_index: this.row_index,
      col_index: this.col_index
    };

    return {
      element: element
    }
  },
  methods: {
    update() {
      this.$emit('element', this.element);
    }
  }
})
</script>

<style scoped>
</style>