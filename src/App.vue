<template>
  <div id="app" class="app">
    <Navbar />
    <div class="container">
      <GridLines />
      <transition :name="transitionName" :mode="'out-in'">
        <router-view :key="$route.path" />
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
  components: {
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.165, 0.85, 0.45, 1);
}

.slideup-enter {
  position: absolute;
  transform: translateY(0.7%);
  opacity: 0;
}

.slideup-leave-to {
  transform: translateY(-0.7%);
  opacity: 0;
}

.slideup-enter-active {
  transition-property: opacity, transform;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.15, 0.4, 0.3, 1);
}
.slideup-leave-active {
  transition-property: opacity, transform;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.165, 0.85, 0.45, 1);
}
</style>
