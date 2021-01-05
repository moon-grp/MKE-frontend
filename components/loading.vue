<template>
  <div class="bg">
    <!--  <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card class="bg">
        <v-row class="justify-center my-auto">
          <v-img src="/mkep1.jpeg" contain height="200" width="200" class="position"> </v-img>
        </v-row>
      </v-card>
    </v-dialog>  -->
    <v-row class="justify-center">
      <v-img
        src="/mkep1.jpeg"
        contain
        height="150"
        width="150"
        class="position animate__animated animate__bounce"
      >
      </v-img>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: true,
      loading: false,
    }
  },
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: red;
}
.bg {
  background: #13274a;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.position {
   width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: bounce;
  animation-duration: 10s;
}



</style>
