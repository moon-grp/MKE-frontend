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
          <v-icon color="#13274a" class="hidden-sm-and-down"> mdi-cart-variant </v-icon>
        </nuxt-link>

        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          class="hidden-md-and-up"
        ></v-app-bar-nav-icon>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item>
              <v-list-item-title>
                <nuxt-link to="#">
                  <div class="text-capitalize navT">cart</div>
                </nuxt-link>
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
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
    Loading,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      group: null,
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
  background: #ffffff;
}
a {
  text-decoration: none;
}

.fnt {
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  color: #ecf4ff;
}

.navT {
  color: #13274a;
}
</style>
