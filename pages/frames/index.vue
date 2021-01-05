<template>
  <div>
    <v-row class="mt-4">
      <v-col cols="3" v-for="item in getProducts" :key="item._id.$oid">
        <nuxt-link :to="'/frames/' + item._id.$oid">
          <div class="productText my-2">
            <v-img :src="item.imgUrl" height="200" contain> </v-img>
            <div class="mt-2">{{ item.productname }}</div>
            <div class="mt-1">₦ {{ item.frameprice }}</div>
          </div>
        </nuxt-link>
      </v-col>
    </v-row>
    <loading  v-if="loading"/>
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
  color: #000000;
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
}

a {
  text-decoration: none;
}
</style>
