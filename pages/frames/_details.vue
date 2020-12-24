<template>
  <div class="productText">
    <v-row>
      <v-col cols="8">
        <div>
          <v-img
            max-height="450"
            max-width="800"
            contain
            :src="products.imgUrl"
          ></v-img>
        </div>
      </v-col>
      <v-col cols="4">
        <div class="text-capitalize h2">{{ products.productname }}.</div>

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
            color="#6c63ff"
          ></v-slider>
        </div>
        <div>
          <v-btn x-large color="#6c63ff" dark @click="getDetails">
            proceed to buy {{ products.productname }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  layout: 'frames',
  data() {
    return {
      id: this.$route.params.details,
      products: '',
      value: 0,
      prodName: '',
      prodPrice: '',
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
      const getProducts = await this.$axios.$get(
        `https://mrkayenterprise.herokuapp.com/api/v1/user/viewproduct/${this.id}`
      )
      console.log(getProducts)
      this.products = getProducts
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
</style>
