<template>
  <div>
    <v-container>
      <v-row class="mt-4">
        <v-col
          sm="4"
          xl="2"
          lg="3"
          md="3"
          xs="6"
          v-for="item in getProducts"
          :key="item._id.$oid"
        >
          <nuxt-link :to="'/frames/' + item._id.$oid">
            <v-card max-width="280" class="mx-6 mt-4" color="#ECECEC">
              <v-row class="justify-center">
                <div>
                  <v-img :src="item.imgUrl" height="250" width="180" contain>
                  </v-img>
                </div>
              </v-row>

              <v-card-actions class="ca">
                <div class="productText my-2">
                  <div class="mt-2">{{ item.productname }}</div>
                  <div class="mt-1">₦ {{ item.frameprice }}</div>
                </div>
              </v-card-actions>
            </v-card>
          </nuxt-link>
        </v-col>
      </v-row>
    </v-container>
    <loading v-if="loading" />
  </div>
</template>

<script>
import Loading from '~/components/loading.vue'
export default {
  layout: 'frames',
  components: {
    Loading,
  },
  data() {
    return {
      getProducts: '',
      loading: false,
    }
  },
  methods: {
    async product() {
      this.loading = true
      try {
        const res = await this.$axios.$get(
          'https://mrkayenterprise.herokuapp.com/api/v1/user/viewproducts'
        )
        this.getProducts = res
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
  },
  /*
  async asyncData({ $axios }) {
    const loading = true
    const getProducts = await $axios.$get(
      'https://mrkayenterprise.herokuapp.com/api/v1/user/viewproducts'
    )
    console.log(this.loading)
    console.log(getProducts)

    return { getProducts, loading }
  },
 */
  created() {
    this.product()
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  font-size: 10px;
}
.productText {
  text-align: center;
  flex: 1 0 0px;
  max-width: 100%;
  color: #f2f2f2;
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
}

a {
  text-decoration: none;
}
.ca {
  background: #13274a;
}

.v-card {
  border-radius: 35px 35px 35px 35px;
}
</style>
