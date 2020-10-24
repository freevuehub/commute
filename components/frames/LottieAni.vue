<template>
  <lottie :path="path" />
</template>

<script lang="ts">
import LottieAnimation from 'lottie-vuejs/src/LottieAnimation.vue'

export default {
  components: {
    lottie: LottieAnimation,
  },
  props: {
    path: {
      type: String,
      default: '',
    },
  },
}
</script>
