<template>
  <router-link
    v-if="!isLink"
    :to="{ name: href }"
    class="nav-link"
    :style="style"
    >{{ label }}</router-link
  >
  <a v-else :href="href" class="nav-link nav-link--email" :style="style">{{
    label
  }}</a>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    label: String,
    gridArea: String,
    href: String,
    isLink: { type: Boolean, default: false }
  },
  computed: {
    style() {
      return 'grid-area: ' + this.gridArea
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nav-link {
  width: unset;
  position: relative;
  padding: 3px 3px;
  color: white;
  font-size: 16px;
  font-weight: 500;
  align-self: end;
  z-index: 200;
  text-align: left;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.165, 0.8, 0.4, 1);

  &:hover {
    padding: 3px 10px;
  }
  &::after {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 0px;
    height: 100%;
    background-color: white;
    transition: all 0.4s cubic-bezier(0.165, 0.8, 0.4, 1);
    mix-blend-mode: difference;
    z-index: 100;
  }
  &:hover:after {
    padding: 3px 10px;
    width: 100%;
  }
  &--email {
    &::after {
      content: 'mateusmullerw@gmail.com';
      display: inline-block;
      position: absolute;
      top: 0%;
      left: 0;
      width: 0px;
      height: 100%;
      padding: 3px 0px;
      color: black;
      mix-blend-mode: luminosity;
      overflow: hidden;
    }
    &:hover:after {
      width: 100%;
      padding: 3px 10px;
    }
  }
}
</style>
