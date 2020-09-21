<template>
  <router-link
    class="project-router"
    :to="{ name: 'ProjectDetails', params: { slug: slug } }"
  >
    <div class="project" :ref="slug">
      <div
        class="project__title"
        :class="{ 'project__title--active': active }"
        :ref="'title-' + slug"
      >
        <h1 class="project__title__h1">{{ title[0] }} <br />{{ title[1] }}</h1>
      </div>
      <div class="project__image" :ref="'image-' + slug">
        <img
          class="project__image__img"
          :class="{ 'project__image__img--active': active }"
          :src="image"
          alt=""
        />
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'project',
  data() {
    return {
      active: false
    }
  },
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
  },
  created() {
    window.addEventListener('scroll', this.handleScroll)
  },
  mounted() {
    this.handleScroll()
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const height = this.$refs[this.slug].getBoundingClientRect().height
      const spacing =
        8 * parseFloat(getComputedStyle(document.documentElement).fontSize)
      const limitTop = window.innerHeight * 0.05
      const limitBottom = limitTop + spacing + height
      const position = this.$refs[this.slug].getBoundingClientRect().top

      position > limitTop && position < limitBottom
        ? (this.active = true)
        : (this.active = false)

      let opacity = 1
      if (position <= window.innerHeight / 3 && !this.active) {
        opacity = (1.5 * (position + height)) / window.innerHeight
      } else if (position >= window.innerHeight / 1.5 && !this.active) {
        opacity = (1.5 * window.innerHeight) / position - 1.5
      } else {
        opacity = 1
      }
      this.$refs[this.slug].style.opacity = opacity
    }
  }
})
</script>

<style scoped lang="scss">
@media screen and (min-width: 0rem) {
  .project-router {
    display: flex;
    max-width: 100%;
    z-index: 100;
    text-decoration: none;
    overflow: hidden;
    &:not(:last-child) {
      margin-bottom: 8rem;
    }
  }
  .project {
    display: flex;
    flex-direction: column-reverse;
    max-width: 100%;

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
      &--active {
        transform: scale(1.1);
        & h1 {
          color: $text-high;
        }
      }
      &__h1 {
        text-align: left;
        text-transform: uppercase;
        color: transparent;
        -webkit-text-stroke: 1px $text-high;
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

    &__img {
      width: 100%;
      object-fit: contain;
      transition: all 0.4s cubic-bezier(0.165, 0.85, 0.45, 1);
    }
  }
}
@media screen and (min-width: $break-medium) {
  .project {
    flex-direction: row;
    margin-bottom: 0rem;
    &__title {
      width: 50%;
      max-width: 50%;

      &__h1 {
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
    &__img {
      clip-path: polygon(0% 0%, 00% 00%, 00% 100%, 0 100%);
      animation-duration: 0.3s;
      animation-name: hideImage;
      animation-iteration-count: 1;
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.165, 0.85, 0.45, 1);
      &--active {
        opacity: 1;
        animation-duration: 0.4s;
        animation-name: showImage;
        animation-iteration-count: 1;
        clip-path: polygon(0% 0%, 100% 00%, 100% 100%, 0 100%);
      }
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
      &__h1 {
        font-size: 3.375rem;
      }
    }
  }
}
</style>
