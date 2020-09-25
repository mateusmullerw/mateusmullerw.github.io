<template>
  <div class="contact-form">
    <transition name="fade" :mode="'out-in'">
      <form
        key="form"
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
        <Button :key="'send'" :type="'submit'" :label="'Send'"> </Button>
      </form>
      <div
        key="loading"
        class="contact-form__loading"
        v-else-if="messageStatus === 1"
      >
        <LoadingIcon class="rotate" />
      </div>
      <div
        key="success"
        class="contact-form__success"
        v-else-if="messageStatus === 2"
      >
        <SentIcon class="icon" />
        <h1 class="contact-form__success__message">Thank you!</h1>
        <p>I will contact you as soon as possible.</p>
      </div>
      <div key="error" class="contact-form__error" v-else>
        <FailedSendIcon class="icon" />
        <p class="contact-form__error__message">
          Ops, the message could not be sent.
        </p>
        <Button
          class="contact-form__error__button"
          :key="'tryagain'"
          :handleClick="() => (messageStatus = 0)"
          :label="'try again'"
        >
        </Button>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import SentIcon from '@/components/icons/SentIcon.vue'
import LoadingIcon from '@/components/icons/LoadingIcon.vue'
import FailedSendIcon from '@/components/icons/FailedSendIcon.vue'

export default Vue.extend({
  name: 'ContactForm',
  components: {
    Input,
    Button,
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
