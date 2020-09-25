<template>
  <button :key="key" class="button" :type="type" @click="handleClick">
    <slot />{{ label }}
  </button>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Button',
  props: {
    label: String,
    type: String,
    key: String,
    handleClick: Function
  }
})
</script>

<style scoped lang="scss">
.button {
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  align-self: flex-end;
  text-transform: uppercase;
  color: transparent;
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
</style>
