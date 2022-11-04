<template>
  <div class="row">
    <h3>{{ element.name }}</h3>
    <div v-if="element.type == 'checklist'" class="col-md-12 checklist">
      <b-form-checkbox
        v-for="(data, index) in datas"
        v-model="datas[index].value.value"
        :key="data"
        @change="onChangeCheckbox(data.id, element.slug, index)"
      >
        {{ data.value.text }}
      </b-form-checkbox>
      <button type="button" class="btn btn-outline-primary" @click="openModal">Aggiungi checkbox</button>
    </div>
    <div v-if="element.type == 'text'" class="col-md-12">
      <quill-editor
        :value="datas[0].value.text"
        @change="onEditorChange(datas[0].id, element.slug, $event)"
      />
    </div>
    <b-modal v-model="showModal" title="Aggiungi checkbox" ok-only ok-title="Crea" centered @ok="addCheckbox">
      <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default">Testo checkbox</span>
        <input v-model="textCheckbox" type="text" class="form-control">
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { quillEditor } from 'vue3-quill';
import { Data, ElementData } from '../interfaces/Structure';
import axios from 'axios';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Element',
  props: {
    element: Object as PropType<ElementData>,
  },
  components: {
    quillEditor
  },
  data() {
    let datas: Array<Data> = [];
    let timer: any;

    if (this.element) {
      if (this.element.datas.length > 0) {
        datas = this.element ? this.element.datas : [];
      }

      if (this.element.datas.length <= 0 && this.element.type == "text") {
        datas = [
          {
            id: undefined,
            value: {
              text: ""
            }
          }
        ];
      }
    }

    return {
      datas: datas,
      timer: timer,
      showModal: false,
      textCheckbox: ""
    }
  },
  methods: {
    onChangeCheckbox(data_id: number, el_slug: string, index: number) {
      let obj = this.datas[index].value;
      this.saveData(data_id, el_slug, obj);
    },
    onEditorChange(data_id: number, el_slug: string, event: any) {
      let value = {
        text: event.html
      };
      const timeout = 1000;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.saveData(data_id, el_slug, value)
      }, timeout);
    },
    saveData(data_id: number, el_slug: string, value: any) {
      if (data_id) {
        this.updateData(data_id, value);
      } else {
        this.createData(el_slug, value);
      }
    },
    createData(el_slug: string, value: any) {
      let params = {
        element_slug: el_slug,
        value: value
      };

      axios
        .post("datas/create", params)
        .then((response) => {
          if (!response.data.success) {
            alert(response.data.message);
            this.$router.back();
          }
        })
        .catch((error) => {
          console.log("ERROR_data", error);
        });
    },
    updateData(data_id: number, value: any) {
      let params = {
        data_id: data_id,
        value: value
      };

      axios
        .put("datas/update", params)
        .then((response) => {
          if (!response.data.success) {
            alert(response.data.message);
            this.$router.back();
          }
        })
        .catch((error) => {
          console.log("ERROR_data", error);
        });
    },
    openModal() {
      this.showModal = true;
    },
    addCheckbox() {
      this.showModal = false;
      
      let data: Data = {
        id: undefined,
        value: {
          text: this.textCheckbox,
          value: false
        }
      };

      let slug = this.element ? this.element.slug : "";

      this.datas.push(data)
      this.createData(slug, data.value);
    }
  }
})
</script>

<style scoped>
</style>