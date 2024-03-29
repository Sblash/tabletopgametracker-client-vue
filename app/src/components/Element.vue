<template>
  <div class="row">
    <div class="col-md-12">
      <div class="btn-group" role="group">
        <button class="btn btn-outline-primary btn-h3" data-bs-toggle="collapse" :href="getHtmlIdHashtag" role="button" aria-expanded="false" :aria-controls="getHtmlId" @click="collapse">
          {{ element.name }} <i v-if="collapsed" class="bi bi-chevron-compact-down"></i> <i v-if="!collapsed" class="bi bi-chevron-compact-up"></i>
        </button>
        <button class="btn btn-outline-primary btn-view-edit" @click="changeMode()">
          <i v-if="view_mode" class="bi bi-pencil"></i> <i v-if="!view_mode" class="bi bi-eye"></i>
        </button>
      </div>
      <div v-if="element.type == 'checklist'" class="col-md-12 checklist collapse multi-collapse show" :id="getHtmlId">
        <div class="checklist-container checklist-false">
          <h5>Non completati/e</h5> <button v-if="!view_mode" type="button" class="btn btn-outline-primary" @click="openModal"><i class="bi bi-plus-lg"></i></button>
          <b-form-checkbox
            v-for="(data, index) in datasFalse"
            v-model="datasFalse[index].value.value"
            :key="data"
            :disabled="view_mode"
            @change="onChangeCheckbox(data.id, element.slug, data, index)"
          >
            {{ data.value.text }}
            <button v-if="!view_mode" type="button" class="btn btn-outline-danger button-delete-checkbox" @click="deleteData(data, index)"><i class="bi bi-trash"></i></button>
          </b-form-checkbox>
        </div>
        <div class="checklist-container checklist-true">
          <h5>Completati/e</h5> <button type="button" class="btn btn-outline-primary" data-bs-toggle="collapse" :href="getHtmlIdCompletedHashtag" role="button" aria-expanded="false" :aria-controls="getHtmlIdCompleted" @click="collapseCompleted">
            <i v-if="collapsedCompleted" class="bi bi-chevron-compact-down"></i>
            <i v-if="!collapsedCompleted" class="bi bi-chevron-compact-up"></i>
          </button>
          <div class="collapse" :id="getHtmlIdCompleted">
            <b-form-checkbox
              v-for="(data, index) in datasTrue"
              v-model="datasTrue[index].value.value"
              :key="data"
              :disabled="view_mode"
              @change="onChangeCheckbox(data.id, element.slug, data, index)"
            >
              {{ data.value.text }}
              <button v-if="!view_mode" type="button" class="btn btn-outline-danger button-delete-checkbox" @click="deleteData(data, index)"><i class="bi bi-trash"></i></button>
            </b-form-checkbox>
          </div>
        </div>
      </div>
      <div v-if="element.type == 'text'" class="col-md-12 collapse multi-collapse show" :id="getHtmlId">
        <quill-editor
          :value="datas[0].value.text"
          :disabled="view_mode"
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
    let datasFalse: Array<Data> = [];
    let datasTrue: Array<Data> = [];
    let timer: any;

    if (this.element) {
      if (this.element.datas.length > 0 && this.element.type == "checklist") {
        datas = this.element.datas;
        for (let i = 0; i < datas.length; i++) {
          if (datas[i].value.value) {
            datasTrue.push(datas[i]);
          } else {
            datasFalse.push(datas[i]);
          }
        }
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
      } else {
        datas = this.element.datas;
      }
    }

    return {
      datasFalse: datasFalse,
      datasTrue: datasTrue,
      datas: datas,
      timer: timer,
      showModal: false,
      textCheckbox: "",
      collapsed: false,
      collapsedCompleted: true,
      view_mode: true
    }
  },
  computed: {
    getHtmlId() {
      let slug = this.element ? this.element.slug : "";
      return "checklist_" + slug;
    },
    getHtmlIdHashtag() {
      let slug = this.element ? this.element.slug : "";
      return "#checklist_" + slug;
    },
    getHtmlIdCompleted() {
      let slug = this.element ? this.element.slug : "";
      return "checklist_" + slug + "_completed";
    },
    getHtmlIdCompletedHashtag() {
      let slug = this.element ? this.element.slug : "";
      return "#checklist_" + slug + "_completed";
    }
  },
  methods: {
    onChangeCheckbox(data_id: number, el_slug: string, data: Data, index: number) {
      if (data.value.value) {
        this.datasFalse.splice(index, 1);
        this.datasTrue.push(data);
      } else {
        this.datasTrue.splice(index, 1);
        this.datasFalse.push(data);
      }
      this.saveData(data_id, el_slug, data.value);
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
          if (response.data.success) {
            let dataCreated: Data = response.data.data;
            let lastIndex = this.datasFalse.length - 1;
            if (lastIndex < 0) lastIndex = 0;

            // if (!this.datas[lastIndex]) this.datas[lastIndex] = {};
            if (!this.datasFalse[lastIndex]) this.datasFalse[lastIndex] = {
              id: undefined,
              value: false
            };

            // this.datas[lastIndex].id = dataCreated.id;
            this.datasFalse[lastIndex].id = dataCreated.id;
          } else {
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
    deleteData(data: Data, index: number) {
      let params = {
        data: {
          data_id: data.id
        }
      };

      axios
        .delete("datas/delete", params)
        .then((response) => {
          if (!response.data.success) {
            alert(response.data.message);
          } else {
            if (data.value.value) {
              this.datasTrue.splice(index, 1);
            } else {
              this.datasFalse.splice(index, 1);
            }
          }
        })
        .catch((error) => {
          console.log("ERROR_delete_data", error);
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

      this.datasFalse.push(data)
      this.createData(slug, data.value);
    },
    collapse() {
      this.collapsed = !this.collapsed;
    },
    collapseCompleted() {
      this.collapsedCompleted = !this.collapsedCompleted;
    },
    changeMode() {
      this.view_mode = !this.view_mode;
    }
  }
})
</script>

<style scoped>
h5 {
  color: grey;
  margin-bottom: 16px;
  display: inline-block;
}

.button-delete-checkbox {
  float: right;
}

.checklist-true {
  margin-top: 16px;
  margin-bottom: 16px;
}

.btn-group > .btn-h3 {
  margin-bottom: 16px;
  color: black;
  text-align: left;
  font-size: calc(1.3rem + 0.6vw);
  font-weight: 500;
  flex-basis: 90%;
}

.bi-chevron-compact-down,.bi-chevron-compact-up {
  float: right;
}

.btn-group > .btn-view-edit {
  margin-bottom: 16px;
  flex-basis: 10%;
}

.btn-group {
  width: 100%;
}
</style>