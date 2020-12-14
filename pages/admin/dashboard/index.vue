<template>
  <div>
    <v-row class="mt-4">
      <v-col cols="3" v-for="item in getProducts" :key="item._id.$oid">
        <v-card max-height="500">
          <v-img
            :src="item.imgUrl"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
            contain
          >
            <v-card-title class="text-capitalize">{{
              item.productname
            }}</v-card-title>
          </v-img>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Description:</v-list-item-title>
              <v-list-item-subtitle class="text-capitalize">{{
                item.description
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Availability:</v-list-item-title>
              <v-list-item-subtitle class="text-capitalize">{{
                item.available
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Price:</v-list-item-title>
              <v-list-item-subtitle class="text-capitalize"
                >₦ {{ item.frameprice }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Slash Price:</v-list-item-title>
              <v-list-item-subtitle class="text-capitalize"
                >₦ {{ item.slashprice }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>mdi-border-color</v-icon>
            </v-btn>

            <v-btn icon @click="getProductId(item._id.$oid)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- dialogs -->
    <v-dialog v-model="dialogDelete" persistent max-width="290">
      <v-card>
        <v-card-title class="caption">
          Sure you want to delete <b> </b> ?
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="deleteProduct()">
            yes
          </v-btn>
          <v-btn color="red darken-1" text @click="dialogDelete = false">
            no
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

     <v-dialog v-model="dialogEdit" persistent max-width="290">
      <v-card>
        <v-card-title class="caption">
          Sure you want to delete <b> </b> ?
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="deleteProduct()">
            yes
          </v-btn>
          <v-btn color="red darken-1" text @click="dialogDelete = false">
            no
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>




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
      pid: "",
    }
  },
  async asyncData({ $axios }) {
    const getProducts = await $axios.$get(
      'https://mrkayenterprise.herokuapp.com/api/v1/admin/viewproducts'
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
        console.log(res)
        this.msg = 'Product deleted succesfully...'
        this.snackbar = true
        location.reload()
      } catch (error) {
        this.dialogDelete = false
        console.log(error.response)
        this.msg = error.response.data
        this.snackbarErr = true
        
      }
    },
    getProductId(id) {
      this.pid = id
      console.log(this.pid)
      this.dialogDelete = true
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
