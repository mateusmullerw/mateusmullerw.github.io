<template>
  <div class="input-field" ref="inputField">
    <label
      class="label"
      :class="{
        'label--float': floatLabel
      }"
      :for="name"
      >{{ label }}</label
    >
    <input
      v-if="!isTextArea"
      ref="input"
      class="input"
      :class="{
        'input--small-font': smallFont,
        'input--error': hasError
      }"
      :type="type"
      :name="name"
      :id="name"
      :value="value"
      v-on:input="handleInput($event.target.value)"
      @blur="$emit('onblur', $event.target.value)"
    />
    <p
      class="input__caption"
      :class="{
        'input__caption--visible': hasError
      }"
    >
      {{ error }}
    </p>
    <textarea
      v-if="isTextArea"
      ref="input"
      class="input input--textarea"
      :class="{
        'input--small-font': smallFont,
        'input--error': hasError
      }"
      :type="type"
      :name="name"
      :id="name"
      :rows="rows"
      :value="value"
      v-on:input="handleInput($event.target.value)"
      @blur="$emit('onblur', $event.target.value)"
    />
    <p
      class="input__caption"
      :class="{
        'input__caption--visible': hasError
      }"
    >
      {{ error }}
    </p>
    <div
      v-if="isTextArea"
      class="height-calc input--small-font"
      ref="heightCalc"
    >
      {{ value }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Input',
  props: {
    label: String,
    type: String,
    name: String,
    id: String,
    value: String,
    error: String,
    handleBlur: Function
  },
  data() {
    return {
      floatLabel: false,
      smallFont: false,
      rows: 1
    }
  },
  computed: {
    isTextArea() {
      return this.type === 'textarea'
    },
    hasError() {
      return this.error !== ''
    }
  },
  methods: {
    handleInput(value: string) {
      this.$emit('input', value)
      this.checkValue(value)
      if (this.isTextArea) {
        const heightCalc = this.$refs.heightCalc as HTMLElement
        const inputField = this.$refs.inputField as HTMLElement
        heightCalc.style.width = `${inputField.getBoundingClientRect().width}px`
        const lineHeight = parseFloat(getComputedStyle(heightCalc).lineHeight)
        const divHeight = heightCalc.getBoundingClientRect().height
        this.rows =
          Math.floor(divHeight / lineHeight) === 0
            ? 1
            : Math.floor(divHeight / lineHeight + 1)
      }
    },
    checkValue(value: string) {
      value === '' ? (this.floatLabel = false) : (this.floatLabel = true)
      value.length > 11 ? (this.smallFont = true) : (this.smallFont = false)
    }
  },
  mounted() {
    this.checkValue(this.value)
  }
})
</script>

<style scoped lang="scss">
@media screen and (min-width: 0rem) {
  /* Change Autocomplete styles in Chrome*/
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    font-size: 3rem;
    border: 0px solid transparent;
    border-bottom: 1px solid $text-medium;
    border-radius: 0;
    -webkit-text-fill-color: $text-high;
    -webkit-transition-delay: 9999s;
    transition-delay: 9999s;
    transition: background-color 9999s ease-in-out 0s;
    -webkit-transition: background-color 9999s ease-in-out 0s;
  }
  .input-field {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    cursor: text;
    &:not(:last-child) {
      margin-bottom: 3rem;
    }
    &:hover {
      .label {
        -webkit-text-stroke: 1px $text-high;
        &--float {
          color: $text-high;
          -webkit-text-stroke: 0px $text-medium;
        }
      }
      .input {
        border-bottom: 1px solid $text-high;
        &:focus {
          border-bottom: 1px solid $acent;
        }
      }
    }
  }
  .label {
    cursor: text;
    position: absolute;
    bottom: -0.5rem;
    padding: 0.8rem 0rem;
    text-transform: uppercase;
    display: block;
    font-size: 3rem;
    font-weight: 900;
    color: transparent;
    -webkit-text-stroke: 1px $text-medium;
    transition: all 0.3s cubic-bezier(0.165, 0.85, 0.45, 1);
    &--float {
      bottom: calc(100% - 0.8rem);
      font-size: 1rem;
      font-weight: 700;
      color: $text-medium;
      -webkit-text-stroke: 0px $text-medium;
    }
  }
  .input {
    caret-color: $text-high;
    font-size: 2rem;
    width: 100%;
    background-color: transparent;
    border: 0px solid transparent;
    border-bottom: 1px solid $text-medium;
    padding: 0.8rem 0rem;
    border-radius: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
    transition: all 0.3s cubic-bezier(0.165, 0.85, 0.45, 1);
    &:focus {
      outline: none;
      border: 0px solid transparent;
      border-bottom: 1px solid $acent;
    }
    &--textarea {
      overflow: hidden;
      text-overflow: ellipsis;
      resize: none;
    }
    &--small-font {
      font-size: 1.125rem;
      font-weight: 500;
      line-height: 1.4rem;
    }
    &--error {
      border-bottom: 1px solid $error;
    }
    &__caption {
      position: absolute;
      bottom: -1.33rem;
      transition: all 0.3s cubic-bezier(0.165, 0.85, 0.45, 1);
      font-size: 0.875rem;
      height: 1.33rem;
      color: $error;
      visibility: hidden;
      &--visible {
        visibility: visible;
      }
    }
  }
  .height-calc {
    position: absolute;
    top: 0.8rem;
    visibility: hidden;
    user-select: none;
    font-family: 'Red Hat Text', sans-serif;
    font-size: 1.125rem;
    font-weight: 500;
    padding: 0;
    border: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
    text-align: left;
    vertical-align: top;
  }
}
@media screen and (min-width: $break-small) {
  .label {
    font-size: 4rem;
    &--float {
      font-size: 1rem;
    }
  }
  .input {
    font-size: 3rem;
    &--small-font {
      font-size: 1.125rem;
      font-weight: 500;
    }
  }
}
</style>
