<template>
    <div class="row">
      <div class="col-md-12" v-if="page.structure">
        <div class="row" v-for="(row, row_index) in page.structure.rows" :key="row">
          <div :class="getClass(row_index)" v-for="(col, col_index) in page.structure.rows[row_index].cols" :key="col">
            <div v-if="elements && Object.keys(elements).length > 0">
              <div v-for="element_structure in page.structure.rows[row_index].cols[col_index].elements" :key="element_structure">
                <Element v-if="elements[element_structure.slug] != undefined" :element="elements[element_structure.slug]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import Element from '../../components/Element.vue';
import { Structure } from '../../interfaces/Structure';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Page',
  components: { 
    Element
  },
  data() {
    const structure: Structure = {
      rows: []
    };
    let elements: any = {};
    return {
      page: {
        structure: structure
      },
      page_slug: "",
      elements: elements
    }
  },
  methods: {
    getPage(page_slug: string) {
      axios
        .get("pages/page/" + page_slug)
        .then((response) => {
          if (response.data.success) {
            this.page = response.data.page;
            let structure = this.page.structure;

            for (let r = 0; r < structure.rows.length; r++) {
              for (let c = 0; c < structure.rows[r].cols.length; c++) {
                for (let e = 0; e < structure.rows[r].cols[c].elements.length; e++) {
                  let slug: string = structure.rows[r].cols[c].elements[e].slug;
                  this.getElement(slug);
                }
              }
            }
          } else {
            alert(response.data.message);
            this.$router.back();
          }
        })
        .catch((error) => {
          console.log("ERROR_page", error);
        });
    },
    getElement(el_slug: string) {
      axios
        .get("elements/element/" + el_slug)
        .then((response) => {
          if (response.data.success) {
            const slug = response.data.element.slug;
            this.elements[slug] = response.data.element;
          } else {
            alert(response.data.message);
            this.$router.back();
          }
        })
        .catch((error) => {
          console.log("ERROR_element", error);
        });
    },
    getClass(row_index: number) {
      const arrayColsSize = this.page.structure.rows[row_index].cols.length;
      let cols = 12 / arrayColsSize
      return "col-md-" + cols;
    }
  },
  watch: {
    '$route'(currentRoute) {
      this.page_slug = currentRoute.params.slug;
    }
  },
  created() {
    this.page_slug = String(this.$route.params.slug);
    this.getPage(this.page_slug);
  }
});
</script>

<style scoped>

</style>