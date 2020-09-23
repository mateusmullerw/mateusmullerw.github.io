<template>
  <div class="home">
    <Project
      v-for="project in projects"
      :key="project.slug"
      :slug="project.slug"
      :title="project.title"
      :img="project.thumbnail"
      :roles="project.roles"
    />
    <ContactForm />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Project from '@/components/Project.vue'
import ContactForm from '@/components/ContactForm.vue'

export default Vue.extend({
  name: 'Home',
  data() {
    return {
      projects: require('@/assets/projects.json')
    }
  },
  beforeMount() {
    document.body.scrollTop = 0
  },
  components: {
    Project,
    ContactForm
  }
})
</script>

<style scoped lang="scss">
@media screen and (min-width: 0px) {
  .home {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    padding: 30vh 0;
  }
}
@media screen and (min-width: $break-large) {
  .home {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    padding: 30vh 16.666%;
  }
}
</style>
