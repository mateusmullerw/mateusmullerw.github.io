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
        <div
          class="col col--1"
          :class="{
            'col--hover': hoveringHome && !isHome,
            'animate-col': startAnimHome,
            'animate-col col--1--contact': startAnimContact
          }"
        ></div>
        <div
          class="col col--2"
          :class="{
            'animate-col col--2--home': startAnimHome,
            'animate-col col--2--contact': startAnimContact
          }"
        ></div>
        <div
          class="col col--3"
          :class="{
            'animate-col col--3--home': startAnimHome,
            'animate-col col--3--contact': startAnimContact
          }"
        ></div>
        <div
          class="col col--4"
          :class="{
            'animate-col col--4--home': startAnimHome,
            'animate-col col--4--contact': startAnimContact
          }"
        ></div>
        <div
          class="col col--5"
          :class="{
            'animate-col col--5--home': startAnimHome,
            'animate-col col--5--contact': startAnimContact
          }"
        ></div>
        <div
          class="col col--6"
          :class="{
            'col--hover': hoveringContact && !isContact,
            'animate-col col--6--home': startAnimHome,
            'animate-col': startAnimContact
          }"
        ></div>
        <div
          class="navlink navlink--home"
          :class="{ 'navlink navlink--no-hover': isHome }"
          :key="'Home'"
          :href="'Home'"
          :gridArea="'link1'"
          @click="!isHome && animHome()"
          @mouseenter="enterHome()"
          @mouseleave="leaveHome()"
        >
          <Logo class="navlink--home__logo" />
        </div>
        <div
          class="navlink navlink--contact"
          :class="{ 'navlink navlink--no-hover': isContact }"
          :key="'Contact'"
          :href="'Contact'"
          :gridArea="'link4'"
          @click="!isContact && animContact()"
          @mouseenter="enterContact()"
          @mouseleave="leaveContact()"
        >
          <p v-if="!isContact">Contact</p>
        </div>
      </div>
    </Container>
  </div>
</template>

<script scoped lang="ts">
import Vue from 'vue'
import Container from '@/components/Container.vue'
import Logo from '@/components/icons/Logo.vue'

export default Vue.extend({
  components: {
    Container,
    Logo
  },
  data() {
    return {
      showNavbar: true,
      transparent: true,
      lastScrollPosition: 0,
      scrollOffset: 50,
      startAnimHome: false,
      startAnimContact: false,
      hoveringHome: false,
      hoveringContact: false
    }
  },
  computed: {
    isHome() {
      return this.$route.name === 'Home'
    },
    isContact() {
      return this.$route.name === 'Contact'
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
    },
    enterHome() {
      this.hoveringHome = true
    },
    leaveHome() {
      this.hoveringHome = false
    },
    enterContact() {
      this.hoveringContact = !this.hoveringContact
    },
    leaveContact() {
      this.hoveringContact = false
    },
    animHome() {
      if (!this.startAnimHome) {
        this.startAnimHome = true
        setTimeout(() => (this.startAnimHome = false), 832)
        this.$router.push({ name: 'Home' })
      }
    },
    animContact() {
      if (!this.startAnimContact) {
        this.startAnimContact = true
        setTimeout(() => (this.startAnimContact = false), 800)
        this.$router.push({ name: 'Contact' })
      }
    }
  }
})
</script>

<style scoped lang="scss">
@media screen and (min-width: 0) {
  .navlink {
    cursor: pointer;
    width: unset;
    display: flex;
    align-items: center;
    position: relative;
    padding: 2rem 0.188rem;
    color: white;
    z-index: 200;
    text-align: left;
    text-decoration: none;
    mix-blend-mode: exclusion;
    transition: all 0.4s cubic-bezier(0.165, 0.8, 0.4, 1);
    &--home {
      grid-area: link1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      &__logo {
        width: 2rem;
        height: 2rem;
      }
    }
    &--no-hover {
      cursor: default;
    }
    &--contact {
      grid-area: link4;
      align-items: center;
      width: 100%;
      & p {
        font-weight: 500;
        line-height: 2rem;
      }
    }
  }
  .navbar {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: 1000;
    padding: 0;
    background-color: $navbar;
    transition: all 0.4s cubic-bezier(0.165, 0.85, 0.45, 1);
    &--hidden {
      transform: translate3d(0, -100%, 0);
    }
    &--transparent {
      background-color: transparent;
    }
    &__grid {
      position: relative;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas: 'link1 link4';
      align-items: start;
      width: 100%;
    }
  }
  .animate-col {
    animation-duration: 0.4s;
    animation-name: anim-col;
    animation-iteration-count: 1;
    animation-timing-function: linear;
  }
  .col {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    border-left: 0.5px solid $line;
    border-right: 0.5px solid $line;
    background-color: $text-high;
    transition: all 0.4s cubic-bezier(0.165, 0.85, 0.45, 1);
    &--hover {
      height: 100%;
    }
    &--1 {
      grid-area: link1;
      &--contact {
        animation-delay: 0.06s;
      }
    }
    &--2 {
      grid-area: col-2;
      display: none;
      &--home,
      &--contact {
        animation-delay: 0.06s;
      }
    }
    &--3 {
      grid-area: col-3;
      display: none;
      &--home {
        animation-delay: 0.12s;
      }
    }
    &--4 {
      grid-area: col-4;
      display: none;
      &--home {
        animation-delay: 0.18s;
      }
    }
    &--5 {
      grid-area: col-5;
      display: none;
      &--home {
        animation-delay: 0.24s;
      }
    }
    &--6 {
      grid-area: link4;
      &--home {
        animation-delay: 0.06s;
      }
    }
  }
}
@media screen and (min-width: $break-medium) {
  .navbar {
    &__grid {
      grid-template-columns: repeat(3, 1fr);
      grid-template-areas: 'link1 col-2 link4';
    }
  }
  .col {
    &--1 {
      &--contact {
        animation-delay: 0.12s;
      }
    }
    &--2 {
      display: block;
      &--contact {
        animation-delay: 0.06s;
      }
    }
    &--6 {
      &--home {
        animation-delay: 0.12s;
      }
    }
  }
}
@media screen and (min-width: $break-medium-large) {
  .navbar {
    &__grid {
      grid-template-columns: repeat(4, 1fr);
      grid-template-areas: 'link1 col-2 col-3 link4';
    }
  }
  .col {
    &--1 {
      &--contact {
        animation-delay: 0.24s;
      }
    }
    &--2 {
      &--contact {
        animation-delay: 0.18s;
      }
    }
    &--3 {
      display: block;
      &--contact {
        animation-delay: 0.12s;
      }
    }
    &--6 {
      &--home {
        animation-delay: 0.18s;
      }
    }
  }
}
@media screen and (min-width: $break-large) {
  .navbar {
    &__grid {
      grid-template-columns: repeat(6, 1fr);
      grid-template-areas: 'link1 col-2 col-3 col-4 col-5 link4';
    }
  }
  .col {
    &--1 {
      &--contact {
        animation-delay: 0.32s;
      }
    }
    &--2 {
      &--contact {
        animation-delay: 0.24s;
      }
    }
    &--3 {
      display: block;
      &--contact {
        animation-delay: 0.18s;
      }
    }
    &--4 {
      display: block;
      &--contact {
        animation-delay: 0.12s;
      }
    }
    &--5 {
      display: block;
      &--contact {
        animation-delay: 0.06s;
      }
    }
    &--6 {
      &--home {
        animation-delay: 0.32s;
      }
    }
  }
}
@keyframes anim-col {
  50% {
    height: 100vh;
    top: 0vh;
  }
  100% {
    top: 100vh;
  }
}
</style>
