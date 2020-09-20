<template>
  <div class="home">
    <div class="projects-container">
      <Project
        v-for="project in projects"
        :key="project.slug"
        :slug="project.slug"
        :title="project.title"
        :img="project.thumbnail"
        :roles="project.roles"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Project from '@/components/Project.vue'

export default Vue.extend({
  name: 'Home',

  data() {
    return {
      projects: require('@/assets/projects.json')
    }
  },
  components: {
    Project
  }
})
</script>

<style scoped lang="scss">
@media screen and (min-width: 0px) {
  .home {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 100%;
    padding: 30vh 0;
  }
}
</style>
