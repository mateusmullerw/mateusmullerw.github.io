<template>
  <router-link
    :to="{ name: 'ProjectDetails', params: { slug: slug } }"
    class="project"
  >
    <div class="project__title">
      <h1>{{ title[0] }} <br />{{ title[1] }}</h1>
    </div>
    <div class="project__image">
      <img :src="image" alt="" />
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'project',
  props: {
    slug: String,
    title: Array,
    img: String,
    roles: Array
  },
  computed: {
    image() {
      return require(`@/assets/thumbnail/${this.img}`)
    }
  }
})
</script>

<style scoped lang="scss">
@media screen and (min-width: 0rem) {
  .project {
    display: flex;
    flex-direction: column-reverse;
    max-width: 100%;
    z-index: 100;
    text-decoration: none;
    &:not(:last-child) {
      margin-bottom: 8rem;
    }

    &__title {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      max-width: 100%;
      z-index: 100;
      transition: all 0.4s cubic-bezier(0.165, 0.85, 0.45, 1);
      transform-origin: center left;
      mix-blend-mode: exclusion;

      & h1 {
        text-align: left;
        text-transform: uppercase;
        font-size: 2.188rem;
        font-weight: 900;
        margin: 0;
        transition: all 0.4s cubic-bezier(0.165, 0.85, 0.45, 1);
      }
    }
  }
  .project__image {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    flex-grow: 1;
    margin-bottom: 0.5rem;

    & img {
      width: 100%;
      object-fit: contain;
    }
    & p {
      display: none;
    }
  }
}
@media screen and (min-width: $break-medium) {
  .project {
    flex-direction: row;
    margin-bottom: 0rem;
    &:hover .project__title {
      transform: scale(1.1);
      & h1 {
        color: $text-high;
      }
    }
    &:hover .project__image img {
      opacity: 1;
      animation-duration: 0.4s;
      animation-name: showImage;
      animation-iteration-count: 1;
      clip-path: polygon(0% 0%, 100% 00%, 100% 100%, 0 100%);
    }
    &:hover .project__image p {
      opacity: 1;
    }
    &__title {
      width: 50%;
      max-width: 50%;

      & h1 {
        -webkit-text-stroke: 1px $text-high;
        color: transparent;
        font-size: 2.75rem;
        margin: 0;
        max-width: 100%;
      }
    }
  }
  .project__image {
    margin: 0;
    width: 50%;
    & img {
      clip-path: polygon(0% 0%, 00% 00%, 00% 100%, 0 100%);
      animation-duration: 0.3s;
      animation-name: hideImage;
      animation-iteration-count: 1;
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.165, 0.85, 0.45, 1);
    }
    & p {
      display: block;
      font-size: 0.875rem;
      font-weight: 400;
      opacity: 0;
      color: $text-medium;
    }
  }
}
@media screen and (min-width: $break-large) {
  .project {
    padding: 0 16.666%;
    &__title {
      & h1 {
        font-size: 3.375rem;
      }
    }
  }
}
</style>
