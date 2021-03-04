<template>
  <v-app dark>
    <div>

        <v-app-bar color="#ffffff" height="100" flat class="pt-2 px-6">
          <nuxt-link to="/frames">
            <v-avatar size="60">
              <v-img class="mx-2" src="/mkep1.jpeg"></v-img>
            </v-avatar>
          </nuxt-link>

          <v-spacer></v-spacer>
          
          <v-spacer></v-spacer>
          <nuxt-link to="/Autos">
            <v-icon color="#13274a"> mdi-cart-variant </v-icon>
          </nuxt-link>
        
      </v-app-bar>   

      <v-main>
       
        <v-container>
          <nuxt />
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import Loading from '~/components/loading.vue'


export default {
  components: {
    Loading
    
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');
body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #FFFFFF;
}
a {
  text-decoration: none;
}

.fnt {
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  color:#ecf4ff;
}

</style>
