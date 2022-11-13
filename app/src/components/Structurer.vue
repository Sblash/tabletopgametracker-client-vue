<template>
  <div class="row">
    <div class="col-md-12">
      <div class="row add_row" @click="addRow">
        <div class="col-md-12 add_button">
          <span>Aggiungi riga</span>
        </div>
      </div>
      <div class="row row_strucure" v-for="(row, row_index) in structure.rows" :key="row">
        <div class="col-md-12 add_button margin_bottom" @click="addColumn(row_index)" v-if="this.structure.rows[row_index].cols.length < 3">
          <span>Aggiungi colonna</span>
        </div>
        <div class="col_structure" :class="getClass(row_index)" v-for="(col, col_index) in structure.rows[row_index].cols" :key="col">
          <div class="add_button margin_bottom" @click="addElement(row_index, col_index)" v-if="this.structure.rows[row_index].cols[col_index].elements.length < 1">
            <span>Aggiungi elemento</span>
          </div>
          <ElementConstructor :existing_element="element" @element="updateElement" :row_index="row_index" :col_index="col_index" v-for="element in structure.rows[row_index].cols[col_index].elements" :key="element"/>
          <button type="button" class="btn btn-outline-danger delete-button" @click="deleteElement(row_index, col_index)" v-if="this.structure.rows[row_index].cols[col_index].elements.length > 0"><i class="bi bi-trash-fill"></i> Elimina elemento</button>
          <button type="button" class="btn btn-outline-danger delete-button" @click="deleteCol(row_index, col_index)" v-if="this.structure.rows[row_index].cols.length > 0"><i class="bi bi-trash-fill"></i> Elimina colonna</button>
        </div>
        <button type="button" class="btn btn-outline-danger delete-button" @click="deleteRow(row_index)" v-if="this.structure.rows.length > 0"><i class="bi bi-trash-fill"></i> Elimina riga</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Structure, Row, Col, Element} from '../interfaces/Structure';
import ElementConstructor from '../components/ElementConstructor.vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Structurer',
  props: {
    existing_structure: Object as PropType<Structure>
  },
  data() {
    let structure: Structure = {
      rows: []
    };

    if (this.existing_structure) {
      structure = this.existing_structure;
    }

    return {
      structure: structure
    }
  },
  components: {
    ElementConstructor
  },
  methods: {
    addRow() {
      const row: Row = {
        cols: []
      };

      this.structure.rows.push(row);
      this.$emit('structure', this.structure);
    },
    addColumn(index: number) {
      const col: Col = {
        elements: []
      };

      this.structure.rows[index].cols.push(col);
      this.$emit('structure', this.structure);
    },
    addElement(row_index: number, col_index: number) {
      const element: Element = {
        name: "",
        type: "",
        slug: "",
        row_index: row_index,
        col_index: col_index
      };

      this.structure.rows[row_index].cols[col_index].elements.push(element);
      this.$emit('structure', this.structure);
    },
    getClass(row_index: number) {
      const arrayColsSize = this.structure.rows[row_index].cols.length;
      let cols = 12 / arrayColsSize
      return "col-md-" + cols;
    },
    deleteElement(row_index: number, col_index: number) {
      this.structure.rows[row_index].cols[col_index].elements.splice(0, 1);
      this.$emit('structure', this.structure);
    },
    deleteCol(row_index: number, col_index: number) {
      this.structure.rows[row_index].cols.splice(col_index, 1);
      this.$emit('structure', this.structure);
    },
    deleteRow(row_index: number) {
      this.structure.rows.splice(row_index, 1);
      this.$emit('structure', this.structure);
    },
    updateElement(value: Element) {
      const row_index: number = value.row_index ? value.row_index : 0;
      const col_index: number = value.col_index ? value.col_index : 0;
      this.structure.rows[row_index].cols[col_index].elements[0].name = value.name;
      this.structure.rows[row_index].cols[col_index].elements[0].type = value.type;
      this.structure.rows[row_index].cols[col_index].elements[0].slug = value.slug;
      this.$emit('structure', this.structure);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add_row {
  margin-left: 0px;
  margin-right: 0px;
  margin-bottom: 16px;
}

.add_button {
  border-radius: 10px;
  border: 1px dashed grey;
  background-color: lightgray;
  padding: 8px;
  max-height: 90px;
  cursor: pointer;
  text-align: center;
}

.margin_bottom {
  margin-bottom: 16px;
}

.row_strucure {
  border: 1px solid black;
  border-radius: 10px;
  margin-left: 0px;
  margin-right: 0px;
  padding: 8px;
  margin-bottom: 16px;
}

.col_structure {
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 16px;
  padding: 8px;
}

.delete-button {
  margin-top: 16px;
}
</style>
