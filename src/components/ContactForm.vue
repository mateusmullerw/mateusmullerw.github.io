<template>
  <form @submit.prevent="submitForm">
    <label>
      <span>Email</span>
      <input type="email" name="email" v-model="email" />
    </label>
    <label>
      <span>Message</span>
      <textarea name="message" v-model="message"></textarea>
    </label>
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'ContactForm',
  data() {
    return {
      email: '',
      message: '',
      endpoint: 'https://formspree.io/xvovodwa'
    }
  },
  methods: {
    async submitForm() {
      const data = {
        email: this.email,
        message: this.message
      }
      await this.$http
        .post(this.endpoint, data)
        .then(response => {
          this.email = ''
          this.message = ''
          console.log(response)
          //i redirect my app to '/success' route once payload completed.
          this.$router.push({ path: '/nowee' })
        })
        .catch(error => {
          if (error.response) {
            alert(error.response)
            // => the response payload
          }
        })
    }
  }
})
</script>

<style scoped lang="scss">
@media screen and (min-width: 0rem) {
  .project-router {
    display: block;
    max-width: 100%;
    min-width: 100%;
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
    min-width: 100%;
    overflow: hidden;
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
    min-width: 100%;
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
    min-width: 50%;
    &__img {
      clip-path: polygon(0% 0%, 00% 00%, 00% 100%, 0 100%);
      animation-duration: 0.3s;
      animation-name: hideImage;
      animation-iteration-count: 1;
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.165, 0.85, 0.45, 1);
      &--active {
        opacity: 1;
        animation-duration: 0.4s;
        animation-name: showImage;
        animation-iteration-count: 1;
        clip-path: polygon(0% 0%, 100% 00%, 100% 100%, 0 100%);
      }
    }
  }
}
@media screen and (min-width: $break-large) {
  .project {
    &__title {
      &__h1 {
        font-size: 3.375rem;
      }
    }
  }
}
</style>
