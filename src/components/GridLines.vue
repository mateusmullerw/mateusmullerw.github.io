<template>
  <div class="grid-lines">
    <div class="container">
      <div class="line line--1"></div>
      <div class="line line--2"></div>
      <div class="line line--3"></div>
      <div class="line line--4"></div>
      <div class="line line--5"></div>
      <div class="line line--6"></div>
      <div class="line line--7"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'GridLines'
})
</script>

<style scoped lang="scss">
@media screen and (min-width: 0px) {
  .grid-lines {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    z-index: -1;
  }
  .container {
    width: 100%;
    max-width: 1500px;
    height: 100vh;
    display: flex;
    justify-content: space-between;
    margin: 0 $page-margin;
    overflow: visible;
  }
  .line {
    height: 100%;
    min-height: 100%;
    width: 1px;
    background-color: $line;
    &--1 {
      display: none;
    }
    &--2 {
      display: none;
    }
    &--3 {
      display: none;
    }
    &--4 {
      display: none;
    }
  }
}
@media screen and (min-width: $break-medium) {
  .line {
    &--1 {
      display: block;
    }
  }
}
@media screen and (min-width: $break-medium-large) {
  .line {
    &--1 {
      display: block;
    }
    &--2 {
      display: block;
    }
  }
}
@media screen and (min-width: $break-large) {
  .line {
    &--1 {
      display: block;
    }
    &--2 {
      display: block;
    }
    &--3 {
      display: block;
    }
    &--4 {
      display: block;
    }
  }
}
</style>
