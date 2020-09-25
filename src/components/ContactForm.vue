<template>
  <div class="contact-form">
    <transition name="fade" :mode="'out-in'">
      <form
        v-if="messageStatus === 0"
        @submit.prevent="submitForm"
        novalidate
        class="contact-form__form"
      >
        <Input
          :label="'Name'"
          :key="'name'"
          :id="'name'"
          :name="'name'"
          :type="'text'"
          :error="name.error"
          v-model="name.value"
          @onblur="validateName"
        />
        <Input
          :label="'Email'"
          :key="'email'"
          :id="'email'"
          :name="'email'"
          :type="'email'"
          :error="email.error"
          v-model="email.value"
          @onblur="validateEmail"
        />
        <Input
          :label="'Message'"
          :key="'message'"
          :id="'message'"
          :name="'message'"
          :type="'textarea'"
          :error="message.error"
          v-model="message.value"
          @onblur="validateMessage"
        />
        <button class="button" type="submit">
          Send
        </button>
      </form>
      <div class="contact-form__loading" v-else-if="messageStatus === 1">
        <LoadingIcon class="rotate" />
      </div>
      <div class="contact-form__success" v-else-if="messageStatus === 2">
        <SentIcon class="icon" />
        <h1 class="contact-form__success__message">Thank you!</h1>
        <p>I will contact you as soon as possible.</p>
      </div>
      <div class="contact-form__error" v-else>
        <FailedSendIcon class="icon" />
        <p class="contact-form__error__message">
          Ops, the message could not be sent.
        </p>
        <button
          class="button contact-form__error__button"
          @click="messageStatus = 0"
        >
          try again
        </button>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Input from '@/components/Input.vue'
import SentIcon from '@/components/icons/SentIcon.vue'
import LoadingIcon from '@/components/icons/LoadingIcon.vue'
import FailedSendIcon from '@/components/icons/FailedSendIcon.vue'

export default Vue.extend({
  name: 'ContactForm',
  components: {
    Input,
    SentIcon,
    LoadingIcon,
    FailedSendIcon
  },
  data() {
    return {
      messageStatus: 0,
      name: { value: '', error: '', touched: false },
      email: { value: '', error: '', touched: false },
      message: { value: '', error: '', touched: false },
      endpoint: 'https://formspree.io/xvovodwa',
      reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    }
  },
  watch: {
    'email.value'() {
      this.email.touched && this.validateEmail()
    },
    'name.value'() {
      this.name.touched && this.validateName()
    },
    'message.value'() {
      this.message.touched && this.validateMessage()
    }
  },
  methods: {
    async submitForm() {
      const data = {
        name: this.name.value,
        email: this.email.value,
        message: this.message.value
      }
      this.validateEmail()
      this.validateName()
      this.validateMessage()
      if (this.isFormReady()) {
        this.messageStatus = 1
        await this.$http
          .post(this.endpoint, data)
          .then(() => {
            this.name.value = ''
            this.email.value = ''
            this.message.value = ''
            this.messageStatus = 2
          })
          .catch(error => {
            if (error.response) {
              this.messageStatus = 3
            }
          })
      }
    },
    validateEmail() {
      this.email.touched = true
      this.email.error =
        this.email.value === ''
          ? 'Required field'
          : this.reg.test(this.email.value)
          ? ''
          : 'Invalid email'
    },
    validateName() {
      this.name.touched = true
      this.name.error = this.name.value === '' ? 'Required field' : ''
    },
    validateMessage() {
      this.message.touched = true
      this.message.error = this.message.value === '' ? 'Required field' : ''
    },
    isFormReady() {
      return (
        !this.name.error &&
        this.name.value &&
        !this.email.error &&
        this.email.value &&
        !this.message.error &&
        this.message.value
      )
    }
  }
})
</script>

<style scoped lang="scss">
@media screen and (min-width: 0rem) {
  .button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    align-self: flex-end;
    text-transform: uppercase;
    color: $background;
    -webkit-text-stroke: 1px $text-high;
    font-size: 3rem;
    font-weight: 900;
    padding: 0.5rem;
    transition: all 0.4s cubic-bezier(0.165, 0.85, 0.45, 1);
    &:hover {
      color: $text-high;
    }
    &:focus {
      outline: 1px solid $outline;
    }
    &:disabled {
      -webkit-text-stroke: 1px $text-low;
    }
  }
  .contact-form {
    width: 100%;
    height: 30rem;
    &__form {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 100%;
      height: 100%;
    }
    &__success,
    &__loading,
    &__error {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    &__success,
    &__loading {
      &__message {
        color: transparent;
        text-transform: none;
        -webkit-text-stroke: 1px $text-medium;
        margin-top: 4rem;
        margin-bottom: 1rem;
      }
    }
    &__error {
      &__message {
        text-transform: none;
        margin-top: 4rem;
        margin-bottom: 1rem;
      }
      &__button {
        align-self: center;
      }
    }
  }
  /deep/ .sent-icon-path {
    stroke: $success;
  }
  /deep/ .failed-send-icon-path {
    stroke: $error;
  }
  .icon {
    width: 16rem;
    height: 16rem;
  }
  .rotate {
    width: 150px;
    height: 150px;
    animation: spin 2s linear infinite;
  }
}
</style>
