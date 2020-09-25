<template>
  <div class="home">
    <div class="hello">
      <h1 class="hello__title">Hi, my name is <span>Mateus Müller</span></h1>
      <h2 class="hello__about">
        I'm a UI/UX designer and front-end developer, here's some of my work.
      </h2>
    </div>
    <Project
      v-for="project in projects"
      :key="project.slug"
      :slug="project.slug"
      :title="project.title"
      :img="project.thumbnail"
      :roles="project.roles"
    />
    <div class="contact">
      <Button
        class="contact__button"
        :key="'tryagain'"
        :handleClick="() => this.$router.push({ name: 'Contact' })"
        :label="'Say hello'"
        ><SentIcon class="contact__icon"
      /></Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Project from '@/components/Project.vue'
import Button from '@/components/Button.vue'
import SentIcon from '@/components/icons/SentIcon.vue'

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
    Button,
    SentIcon
  }
})
</script>

<style scoped lang="scss">
@media screen and (min-width: 0px) {
  .home {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    padding: 20vh 0 4rem 0;
  }
  .hello {
    width: 100%;
    margin-bottom: 6rem;
    &__title {
      margin-bottom: 1rem;
      text-transform: none;
      color: transparent;
      line-height: 4.3rem;
      -webkit-text-stroke: 1px $text-high;
      & span {
        color: $text-high;
      }
    }
    &__about {
      color: $text-medium;
      font-size: 1.3rem;
      line-height: 2rem;
      font-weight: 400;
    }
  }
  .contact {
    margin-top: 10rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    &__icon {
      margin-right: 1rem;
      width: 4rem;
      /deep/ .sent-icon-path {
        stroke-width: 4px;
      }
    }
  }
}
@media screen and (min-width: $break-medium) {
  .hello {
    width: 70%;
  }
}
@media screen and (min-width: $break-medium-large) {
  .hello {
    width: 60%;
  }
}
@media screen and (min-width: $break-large) {
  .home {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    padding: 20vh 16.666% 4rem 16.666%;
  }
  .hello {
    width: 50%;
  }
}
</style>
