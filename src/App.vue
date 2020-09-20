<template>
  <div id="app" class="app">
    <Navbar :key="'nav'" :Navbar="Navbar" />
    <div class="container">
      <GridLines />
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import GridLines from '@/components/GridLines.vue'
import Navbar from '@/components/Navbar.vue'

export default Vue.extend({
  name: 'app',
  data() {
    return {
      Navbar: [
        {
          label: 'Mateus Müller',
          href: 'Home',
          gridArea: 'link1',
          isLink: false
        },
        {
          label: 'Contato',
          href: 'mailto: mateusmullerw@gmail.com',
          gridArea: 'link4',
          isLink: true
        }
      ]
    }
  },
  components: {
    GridLines,
    Navbar
  }
})
</script>

<style lang="scss">
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.container {
  position: relative;
  width: 100%;
  max-width: 1500px;
  min-height: 100%;
  margin: 0 $page-margin;
}

@keyframes showImage {
  0% {
    opacity: 0.5;
    clip-path: polygon(0% 0%, 00% 00%, 00% 100%, 0 100%);
  }
  30% {
    clip-path: polygon(0% 0%, 20% 0%, 40% 100%, 0 100%);
  }
  100% {
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

.fade-enter-active {
  transition: opacity 0.3s cubic-bezier(0.5, 0.15, 0.2, 0.9);
}
.fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.165, 0.85, 0.45, 1);
}
</style>
