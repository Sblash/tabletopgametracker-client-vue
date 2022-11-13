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
import { defineComponent, PropType } from 'vue';
import { Element} from '../interfaces/Structure';

export default defineComponent({
  name: 'ElementConstructor',
  props: {
    row_index: Number,
    col_index: Number,
    existing_element: Object as PropType<Element>
  },
  data() {
    let element: Element = {
      name: "",
      type: "",
      slug: "",
      row_index: this.row_index,
      col_index: this.col_index
    };
    
    let is_update = false;

    if (this.existing_element) {
      is_update = true;
      element = this.existing_element;
    }

    return {
      element: element,
      is_update: is_update
    }
  },
  methods: {
    update() {
      //if is not an update then create the slug
      if (!this.is_update) this.element.slug = this.getSlug(this.element.name);
      this.$emit('element', this.element);
    },
    getSlug(value: string) {
      let slug = value.toLowerCase().trim();
      slug = slug.replace(/ /gi, "_");

      return slug;
    }
  }
})
</script>

<style scoped>
</style>