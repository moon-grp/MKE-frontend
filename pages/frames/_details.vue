<template>
  <div class="productText">
    <v-row class="mt-4">
      <v-col lg="8" md="8" sm="12">
        <div>
          <!--      <v-img
            max-height="450"
            max-width="600"
            contain
            :src="products.imgUrl"
          ></v-img> -->

          <v-card max-width="280" class="mx-6 mt-4" color="#ECECEC">
            <v-row class="justify-center">
              <div>
                <v-img :src="products.imgUrl" height="250" width="180" contain>
                </v-img>
              </div>
            </v-row>

            <v-card-actions class="ca">
             
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
      <v-col lg="3" md="4" sm="12" class="mx-2">
        <div class="text-capitalize h2 mt-2">{{ products.productname }}.</div>

        <div class="text-capitalize mt-2 body-1">
          {{ products.description }}
        </div>
        <div class="text-capitalize mt-2 subtitle-1">
          ₦{{ products.frameprice }}
        </div>

        <div class="text-capitalize mt-2 caption">
          slash price: ₦{{ products.slashprice }}
        </div>

        <div class="mt-2">
          <v-slider
            v-model="value"
            label="How many?"
            step="1"
            thumb-label="always"
            :thumb-size="18"
            color="#13274a"
          ></v-slider>
        </div>
        <div>
          <v-btn x-large color="#13274a" dark @click="getDetails">
            proceed to buy
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <loading v-if="loading" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Loading from '~/components/loading.vue'
export default {
  layout: 'frames',
  components: {
    Loading,
  },
  data() {
    return {
      id: this.$route.params.details,
      products: '',
      value: 0,
      prodName: '',
      prodPrice: '',
      loading: false,
    }
  },

  created() {
    this.getProduct()
  },
  methods: {
    ...mapMutations({
      addProductDetails: 'addProductDetails',
    }),
    getDetails() {
      let prod = {
        productName: this.products.productname,
        price: this.products.frameprice,
        qty: this.value,
      }
      this.addProductDetails(prod)
      this.$router.push({ name: 'checkout' })
    },
    async getProduct() {
      // const id = route.params.details
      this.loading = true
      const getProducts = await this.$axios.$get(
        `https://mrkayenterprise.herokuapp.com/api/v1/user/viewproduct/${this.id}`
      )
      console.log(getProducts)

      this.products = getProducts
      this.loading = false
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  font-size: 80px;
}

.imgh {
  height: 50%;
}
.productText {
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  color: #000000;
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
