<template>
  <svg
    class="loading-icon-svg"
    width="100%"
    height="100%"
    viewBox="0 0 207 207"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="loading-icon-path"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M104 0.501188C103.833 0.500396 103.667 0.5 103.5 0.5C46.6147 0.5 0.5 46.6147 0.5 103.5C0.5 160.385 46.6147 206.5 103.5 206.5C139.516 206.5 171.215 188.014 189.626 160.013L188.789 159.466C170.557 187.194 139.166 205.5 103.5 205.5C47.167 205.5 1.5 159.833 1.5 103.5C1.5 47.167 47.167 1.5 103.5 1.5C103.667 1.5 103.833 1.5004 104 1.5012V0.501188Z"
      fill="url(#gradient1)"
    />
    <defs>
      <radialGradient
        id="gradient1"
        cx="0"
        cy="0"
        r="14%"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(0 10) rotate(90) scale(10 10)"
      >
        <stop offset="0.35" stop-color="white" />
        <stop offset="0.789" stop-color="white" stop-opacity="0" />
      </radialGradient>

      <radialGradient r="50%" cy="50%" cx="50%" id="gradient4">
        <stop stop-color="transparent" offset="0"></stop>
        <stop stop-color="#fff" offset="1"></stop>
      </radialGradient>
      <linearGradient id="gradient3">
        <stop offset="0%" style="stop-color: #906; stop-opacity: 1.0" />
        <stop offset="50%" style="stop-color: #906; stop-opacity: 0.3" />
        <stop offset="100%" style="stop-color: #906; stop-opacity: 0.10" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoadingIcon'
})
</script>
