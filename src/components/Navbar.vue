<template>
  <div
    class="navbar"
    :class="{
      'navbar--hidden': !showNavbar,
      'navbar--transparent': transparent
    }"
  >
    <Container>
      <div class="navbar__grid">
        <Navlink
          :key="'Home'"
          :label="isHome ? 'Mateus Müller' : 'Home'"
          :href="'Home'"
          :gridArea="'link1'"
        />
        <Navlink
          :key="'Contact'"
          :label="'Contact'"
          :href="'mailto: mateusmullerw@gmail.com'"
          :gridArea="'link4'"
          :isLink="true"
        />
      </div>
    </Container>
  </div>
</template>

<script scoped lang="ts">
import Vue from 'vue'
import Container from '@/components/Container.vue'
import Navlink from '@/components/Navlink.vue'

export default Vue.extend({
  components: {
    Container,
    Navlink
  },
  data() {
    return {
      showNavbar: true,
      transparent: true,
      lastScrollPosition: 0,
      scrollOffset: 50
    }
  },
  computed: {
    isHome() {
      return this.$route.name === 'Home'
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
    this.lastScrollPosition = window.pageYOffset
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    onScroll() {
      if (window.pageYOffset < 0) {
        return
      }
      if (
        Math.abs(window.pageYOffset - this.lastScrollPosition) <
        this.scrollOffset
      ) {
        return
      }
      this.showNavbar = window.pageYOffset < this.lastScrollPosition
      this.transparent = window.pageYOffset < this.scrollOffset
      this.lastScrollPosition = window.pageYOffset
    }
  }
})
</script>

<style scoped lang="scss">
@media screen and (min-width: 0) {
  .navbar {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: 1000;
    padding: 2rem 0;
    background-color: $navbar;
    transition: all 0.4s cubic-bezier(0.165, 0.85, 0.45, 1);

    &--hidden {
      transform: translate3d(0, -100%, 0);
    }
    &--transparent {
      background-color: transparent;
    }
    &__grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas: 'link1 link4';
      width: 100%;
    }
  }
}
@media screen and (min-width: $break-medium) {
  .navbar {
    &__grid {
      grid-template-columns: repeat(3, 1fr);
      grid-template-areas: 'link1 col link4';
    }
  }
}
@media screen and (min-width: $break-medium-large) {
  .navbar {
    &__grid {
      grid-template-columns: repeat(4, 1fr);
      grid-template-areas: 'link1 col col link4';
    }
  }
}
@media screen and (min-width: $break-large) {
  .navbar {
    &__grid {
      grid-template-columns: repeat(6, 1fr);
      grid-template-areas: 'link1 col col col col link4';
    }
  }
}
</style>
