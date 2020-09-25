<template>
  <div class="contact">
    <h1 class="contact__title">
      Contact
    </h1>
    <div class="contact__content">
      <div class="contact__message">
        <h2 class="contact__paragraph">
          You can send me an email at
        </h2>
        <h3 class="contact__email">
          mateusmullerw@gmail.com
        </h3>
      </div>
      <div class="contact__form">
        <h2 class="contact__paragraph">
          Or leave me a message here
        </h2>
        <ContactForm />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ContactForm from '@/components/ContactForm.vue'

export default Vue.extend({
  name: 'Contact',
  beforeMount() {
    document.body.scrollTop = 0
  },
  components: {
    ContactForm
  }
})
</script>

<style scoped lang="scss">
@media screen and (min-width: 0px) {
  .contact {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 25vh;
    &__title {
      text-transform: none;
      margin-bottom: 3rem;
    }
    &__content {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    &__message {
      width: 100%;
      margin-bottom: 7rem;
    }
    &__paragraph {
      font-size: 1rem;
      font-weight: 400;
      margin-bottom: 0.5rem;
      color: $text-medium;
    }
    &__email {
      font-size: 1.125rem;
    }
    &__form {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-bottom: 4rem;
      .contact__paragraph {
        margin-bottom: 2rem;
      }
    }
  }
}
@media screen and (min-width: $break-medium) {
  .contact {
    &__content {
      width: 66.666%;
    }
  }
}

@media screen and (min-width: $break-medium-large) {
  .contact {
    &__content {
      width: 100%;
    }
    &__message {
      width: 50%;
    }
    &__form {
      width: 50%;
    }
  }
}
@media screen and (min-width: $break-large) {
  .contact {
    padding: 0 16.666%;
  }
}
</style>
