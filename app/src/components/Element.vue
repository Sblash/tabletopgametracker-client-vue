<template>
  <div class="row">
    <h3>{{ element.name }}</h3>
    <div v-if="element.type == 'checklist'" class="col-md-12 checklist">
      <b-form-checkbox
        v-for="(data, index) in datas"
        v-model="datas[index].value.value"
        :key="data"
        @change="onChangeCheckbox"
      >
        {{ data.value.text }}
      </b-form-checkbox>
    </div>
    <div v-if="element.type == 'text'" class="col-md-12">
      <quill-editor
        :value="datas.value.text"
        @change="onEditorChange($event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { quillEditor } from 'vue3-quill'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Element',
  props: {
    element: Object
  },
  components: {
    quillEditor
  },
  data() {
    let datas = {
      value: {
        text: ""
      }
    };

    if (this.element.datas.length > 0) {
      datas = this.element.datas;
    }

    return {
      datas: datas
    }
  },
  methods: {
    onChangeCheckbox(value: boolean) {
      console.log(value);
      console.log(this.datas);
    },
    onEditorChange(event: any) {
      console.log(event);
    }
  }
})
</script>

<style scoped>
</style>