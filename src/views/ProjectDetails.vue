<template>
  <div class="project-details">
    <h1 class="project-details__title">
      {{ project.title[0] }} <br />{{ project.title[1] }}
    </h1>
    <div class="project-details__about">
      <div class="project-details__about__left">
        <p
          v-for="(paragraph, index) in project.about"
          :key="index"
          class="project-details__paragraph"
        >
          {{ paragraph }}
        </p>
      </div>
      <div class="project-details__about__right">
        <div class="project-details__item" v-if="project.roles">
          <h2>My role</h2>
          <p v-for="(role, index) in project.roles" :key="index">
            {{ role }}
          </p>
        </div>
        <div class="project-details__item" v-if="project.technologies">
          <h2>Worked with</h2>
          <div
            class="project-details__tech"
            v-for="(tech, index) in project.technologies"
            :key="index"
          >
            <img
              class="project-details__tech__icon"
              v-bind:src="getIcon(tech.icon)"
              alt=""
            />
            <p>{{ tech.label }}</p>
          </div>
        </div>
        <div class="project-details__item" v-if="project.link">
          <h2>Project website</h2>
          <a :href="`https://${project.link}`" target="_blank">{{
            project.link
          }}</a>
        </div>
      </div>
    </div>
    <img
      class="project-details__image"
      v-for="image in project.images"
      :key="image"
      :src="getImage(image)"
      alt=""
    />
    <div class="next-project">
      <h3>Next</h3>
      <router-link
        :to="{ name: 'ProjectDetails', params: { slug: nextProject.slug } }"
        class="next-project"
      >
        <h1 class="project-details__title">
          {{ nextProject.title[0] }} <br />{{ nextProject.title[1] }}
        </h1>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProjectDetails',
  data() {
    return {
      projects: require('@/assets/projects.json')
    }
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  computed: {
    project() {
      return this.projects.find(project => project.slug === this.slug)
    },
    nextProject() {
      const index =
        this.projects.findIndex(project => project.slug === this.slug) + 1 ===
        this.projects.length
          ? 0
          : this.projects.findIndex(project => project.slug === this.slug) + 1

      return {
        title: this.projects[index].title,
        slug: this.projects[index].slug
      }
    }
  },
  methods: {
    getIcon(icon) {
      return require(`@/assets/icon/${icon}`)
    },
    getImage(image) {
      return require(`@/assets/${this.slug}/${image}.png`)
    }
  },
  beforeMount() {
    document.body.scrollTop = 0
  }
}
</script>
<style scoped lang="scss">
@media screen and (min-width: 0px) {
  .project-details {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20vh;
    &__title {
      font-size: 2.5rem;
      max-width: 100%;
      overflow: hidden;
      align-self: flex-start;
      margin-bottom: 2rem;
    }
    &__paragraph {
      margin-bottom: 1rem;
    }
    &__about {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 3rem;
      max-width: 100%;
      &__left {
        align-self: flex-start;
        width: 100%;
        margin-bottom: 5rem;
      }
      &__right {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
      }
    }
    &__item {
      flex-basis: 25%;
      flex-grow: 1;
      flex-shrink: 0;
      min-width: 13.5rem;
      max-width: 13.5rem;
      margin-bottom: 2.2rem;
      p {
        margin-bottom: 0.5rem;
      }
      h2 {
        margin-bottom: 0.8rem;
      }
    }
    &__tech {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
      p {
        margin-bottom: 0;
      }
      &__icon {
        width: 1.75rem;
        height: 1.75rem;
        margin-right: 0.3rem;
        margin-bottom: 0;
      }
    }
    &__image {
      width: 100%;
      max-width: 100%;
      margin-bottom: 3rem;
    }
  }
  .next-project {
    text-decoration: none;
    width: 100%;
    max-width: 100%;
    overflow: hidden;

    & h1 {
      -webkit-text-stroke: 1px $text-medium;
      color: transparent;
      transition: all 0.4s cubic-bezier(0.165, 0.8, 0.4, 1);
    }
    & h3 {
      -webkit-text-stroke: 1px $background;
      text-align: left;
      margin: 0;
    }
  }
}
@media screen and (min-width: $break-small) {
  .project-details {
    &__title {
      font-size: 3.375rem;
    }
    &__about {
      &__right {
        justify-content: flex-start;
      }
    }
    &__item {
      flex-basis: 50%;
      max-width: 50%;
    }
  }
}
@media screen and (min-width: $break-medium) {
  .project-details {
    &__about {
      &__left {
        width: 66.66%;
      }
      &__right {
        width: 100%;
      }
    }
    &__item {
      flex-basis: 33.33%;
      max-width: 33.33%;
    }
    .next-project:hover {
      & h1 {
        color: $text-high;
      }
    }
  }
}
@media screen and (min-width: $break-medium-large) {
  .project-details {
    &__about {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      &__left {
        width: 50%;
        margin-bottom: 0;
        margin-right: 25%;
      }
      &__right {
        flex-direction: column;
        width: 25%;
      }
    }
  }
}
@media screen and (min-width: $break-large) {
  .project-details {
    margin: 0 16.66%;
  }
}
</style>
