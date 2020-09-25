<template>
  <div class="grid-lines">
    <Container>
      <div class="grid-lines__flex">
        <div class="line line--1"></div>
        <div class="line line--2"></div>
        <div class="line line--3"></div>
        <div class="line line--4"></div>
        <div class="line line--5"></div>
        <div class="line line--6"></div>
        <div class="line line--7"></div>
      </div>
    </Container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Container from '@/components/Container.vue'

export default Vue.extend({
  name: 'GridLines',
  components: {
    Container
  }
})
</script>

<style scoped lang="scss">
@media screen and (min-width: 0px) {
  .grid-lines {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    &__flex {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }
  .line {
    height: 100%;
    min-height: 100vh;
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
    &--2 {
      display: block;
    }
  }
}
@media screen and (min-width: $break-large) {
  .line {
    &--3 {
      display: block;
    }
    &--4 {
      display: block;
    }
  }
}
</style>
