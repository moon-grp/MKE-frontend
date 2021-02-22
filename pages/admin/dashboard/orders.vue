<template>
  <div>
    <v-simple-table class="mt-4">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Customer name</th>
            <th class="text-left">Customer Email</th>
            <th class="text-left">Customer Phone</th>
            <th class="text-left">Customer Address</th>
            <th class="text-left">Product Name</th>
            <th class="text-left">Qty</th>
            <th class="text-left">Delivered</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in getProducts" :key="item._id.$oid">
            <td>{{ item.CustomerName }}</td>
            <td>{{ item.CustomerEmail }}</td>
            <td>{{ item.CustomerPhone }}</td>
            <td>{{ item.CustomerAddress }}</td>
            <td>{{ item.ProductName }}</td>
            <td>{{ item.Quantity }}</td>
            <td>{{ item.delivered }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <!-- pop up -->
    <v-snackbar v-model="snackbar" :timeout="timeout" color="success">
      {{ msg }}
    </v-snackbar>
    <v-snackbar v-model="snackbarErr" :timeout="timeout" color="error">
      {{ msg }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      dialogEdit: false,
      dialogDelete: false,
      snackbar: false,
      snackbarErr: false,
      timeout: 7000,
      msg: '',
      pid: '',
      loading: false,
      productPrice: null,
      productName: null,
      productDescription: null,
      productSlashPrice: null,
      productImage: '',
      available: '',
      productPriceE: null,
      productNameE: null,
      productDescriptionE: null,
      productSlashPriceE: null,
      productImage: '',
      file: [],
    }
  },
  async asyncData({ $axios }) {
    const getProducts = await $axios.$get(
      'https://mrkayenterprise.herokuapp.com/api/v1/user/vieworders'
    )

    console.log(getProducts)

    return { getProducts }
  },
  methods: {
    async deleteProduct() {
      try {
        this.dialogDelete = false
        const res = await this.$axios.$delete(
          `https://mrkayenterprise.herokuapp.com/api/v1/admin/deleteproduct/${this.pid}`
        )
        //  console.log(res)
        this.msg = 'Product deleted succesfully...'
        this.snackbar = true
        location.reload()
      } catch (error) {
        this.dialogDelete = false
        // console.log(error.response)
        this.msg = error.response.data
        this.snackbarErr = true
      }
    },
    getProductId(id) {
      this.pid = id
      //console.log(this.pid)
      this.dialogDelete = true
    },
    getProductDetails(id, name, price, slash, description) {
      this.pid = id
      this.productPrice = price
      this.productName = name
      this.productDescription = description
      this.productSlashPrice = slash

      this.dialogEdit = true
    },
    async uploadProduct() {
      const fd = new FormData()
      fd.append('frame_img', this.file)
      fd.append('framePrice', this.productPrice)
      fd.append('productName', this.productName)
      const available = true
      fd.append('available', available)
      fd.append('slashPrice', this.productSlashPrice)
      fd.append('description', this.productDescription)

      this.loading = true
      try {
        const res = await this.$axios.$post(
          `https://mrkayenterprise.herokuapp.com/api/v1/admin/editproduct/${this.pid}`,

          fd
        )
        console.log(res)
        this.msg = 'Product Updated succesfully...'
        this.snackbar = true
        this.loading = false
        location.reload()
      } catch (error) {
        console.log(error.response)
        this.msg = error.response.data
        this.snackbarErr = true
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  font-size: 10px;
}
</style>
