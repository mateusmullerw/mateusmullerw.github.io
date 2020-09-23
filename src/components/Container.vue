<template>
  <div class="container">
    <div class="container__constraint">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Container'
})
</script>

<style scoped lang="scss">
@media screen and (min-width: 0rem) {
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    &__constraint {
      position: relative;
      width: 100%;
      max-width: 1500px;
      margin: 0 $page-margin;
    }
  }
}
@media screen and (min-width: $break-small) and (max-width: $break-large) {
  .container {
    &__constraint {
      margin: 0 10%;
    }
  }
}
</style>
