<template>
  <div class="container-fluid header">
    <div class="row">
      <div class="col-md-1 col-auto" v-if="path !== '/groups'">
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-outline-secondary" @click="back()"><i class="bi bi-arrow-left"></i></button>
          <button type="button" class="btn btn-outline-secondary"><router-link to="/groups"><i class="bi bi-house"></i></router-link></button>
        </div>
      </div>
      <div class="col-md-10 col-5" :class="resizeTitlePage">
        <h2 class="title-page">{{ getNameFromSlug() }}</h2>
      </div>
      <!-- <div class="col-md-1 col-auto" v-if="showMenuButton">
        <button id="menu" type="button" class="btn btn-outline-secondary menu-button" data-bs-toggle="collapse" data-bs-target="#menu-collapse" aria-expanded="false" aria-controls="menu-collapse"><i class="bi bi-list"></i></button>
      </div> -->
      <div class="col-md-1 col-auto" v-if="showEditButton">
        <button type="button" class="btn btn-outline-secondary edit-button" @click="goToEditPage()"><i class="bi bi-pencil"></i></button>
      </div>
    </div>
    <!-- <div class="collapse" id="menu-collapse">
      <div class="card card-body">
        Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  components: {
    RouterLink
  },
  data() {
    return {
      path: "",
      pathname: "",
      slug: ""
    }
  },
  watch: {
    '$route'(currentRoute) {
      this.path = currentRoute.path;
      this.pathname = currentRoute.name;
      this.slug = currentRoute.params.slug;
    }
  },
  computed: {
    showEditButton() {
      let routes: Array<string> = [
        "group-games",
        "game-pages",
        "page"
      ];

      if (routes.includes(this.pathname)) return true;

      return false;
    },
    resizeTitlePage() {
      if (this.path == "/groups") return "col-md-12 col-12";
      return "";
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
    goToEditPage() {
      switch(this.pathname) {
        case "page":
          this.$router.push("/page/" + this.slug + "/edit-page");
          break;
      }
    },
    getNameFromSlug() {
      if (this.slug && this.slug != "") {
        return this.slug.replace(/_/gi, " ");
      }

      return "Tabletop game tracker"
    },
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  border-bottom: 1px solid black;
  margin-bottom: 16px;
}

button {
  margin-bottom: 8px;
}

.title-page {
  text-align: center;
}

.edit-button {
  margin-left: 25%;
}
</style>
