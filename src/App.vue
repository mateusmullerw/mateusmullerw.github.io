<template>
  <div id="app" class="app">
    <Navbar />
    <GridLines />
    <Container>
      <transition :name="transitionName" :mode="'out-in'">
        <router-view :key="$route.path" />
      </transition>
    </Container>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Container from '@/components/Container.vue'
import GridLines from '@/components/GridLines.vue'
import Navbar from '@/components/Navbar.vue'

export default Vue.extend({
  name: 'app',
  components: {
    Container,
    GridLines,
    Navbar
  },
  data() {
    return {
      transitionName: 'fade',
      transitionMode: 'out-in'
    }
  },
  watch: {
    $route(to, from) {
      if (to.path === '/' || from.path === '/') {
        this.transitionName = 'fade'
      } else {
        this.transitionName = 'slideup'
      }
    }
  }
})
</script>

<style lang="scss">
@media screen and (min-width: 0rem) {
  .app {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    &__container {
      position: relative;
      width: 100%;
      max-width: 1500px;
      min-height: 100%;
      margin: 0 $page-margin;
    }
  }
}
@media screen and (min-width: $break-medium) and (max-width: $break-large) {
  .app {
    &__container {
      margin: 0 10%;
    }
  }
}

@keyframes showImage {
  0% {
    opacity: 0;
    clip-path: polygon(0% 0%, 00% 00%, 00% 100%, 0 100%);
  }
  30% {
    opacity: 0.2;
    clip-path: polygon(0% 0%, 20% 0%, 40% 100%, 0 100%);
  }
  100% {
    opacity: 1;
    clip-path: polygon(0% 0%, 100% 00%, 100% 100%, 0 100%);
  }
}
@keyframes hideImage {
  0% {
    clip-path: polygon(0% 0%, 100% 00%, 100% 100%, 0 100%);
  }
  30% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 50%, 0 70%);
  }
  100% {
    clip-path: polygon(0% 0%, 100% 00%, 100% 00%, 0 0%);
  }
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s cubic-bezier(0.165, 0.85, 0.45, 1);
}

.slideup-enter {
  div,
  img {
    opacity: 0;
  }
}

.slideup-leave-to {
  * :not(:last-child),
  img {
    opacity: 0;
  }
  :last-child a .project-details__title {
    color: $text-high;
  }
}

.slideup-enter-active {
  transition: opacity 0.4s cubic-bezier(0.15, 0.4, 0.3, 1);
  div,
  img {
    transition: opacity 0.4s cubic-bezier(0.15, 0.4, 0.3, 1);
  }
}
.slideup-leave-active {
  * :not(:last-child),
  img {
    transition: opacity 0.4s cubic-bezier(0.165, 0.85, 0.45, 1);
  }
}
</style>
