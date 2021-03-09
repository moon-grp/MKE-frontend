<template>
  <div>
    <v-row class="justify-center">
      <div class="mx-auto">
        <Lottie
          :width="600"
          :height="500"
          :options="lottieOptions"
          v-on:animCreated="handleAnimation"
        />
      </div>
    </v-row>
  </div>
</template>

<script>
import Lottie from 'vue-lottie/src/lottie.vue'
import * as animationData from '~/assets/uc.json'

export default {
  layout: 'autos',
  components: {
    Lottie,
  },
  data() {
    return {
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
    }
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim
    },
  },
}
</script>
