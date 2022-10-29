<template>
  <div class="row">
    <div class="col-md-12">
      <div class="row add_row" @click="addRow">
        <div class="col-md-12 add_button">
          <span>Aggiungi riga</span>
        </div>
      </div>
      <div class="row row_strucure" v-for="(row, rowIndex) in structure.rows" :key="row">
        <div class="col-md-12 add_button margin_bottom" @click="addColumn(rowIndex)" v-if="this.structure.rows[rowIndex].cols.length < 3">
          <span>Aggiungi colonna</span>
        </div>
        <div class="col_structure" :class="getClass(rowIndex)" v-for="(col, colIndex) in structure.rows[rowIndex].cols" :key="col">
          <div class="add_button margin_bottom" @click="addElement(rowIndex, colIndex)">
            <span>Aggiungi elemento</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Structure, Row, Col, Element} from '../interfaces/Structure';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Structurer',
  data() {
    const structure: Structure = {
      rows: []
    };

    return {
      structure: structure
    }
  },
  methods: {
    addRow() {
      const row: Row = {
        cols: []
      };
      
      this.structure.rows.push(row);
    },
    addColumn(index: number) {
      const col: Col = {
        elements: []
      };

      this.structure.rows[index].cols.push(col);
    },
    addElement(rowIndex: number, colIndex: number) {
      const element: Element = {
        name: "",
        type: "",
        page_slug: ""
      };

      this.structure.rows[rowIndex].cols[colIndex].elements.push(element);
    },
    getClass(rowIndex: number) {
      const arrayColsSize = this.structure.rows[rowIndex].cols.length;
      let cols = 12 / arrayColsSize
      return "col-md-" + cols;
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
</style>
