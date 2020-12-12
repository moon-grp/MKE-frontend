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

            <v-dialog v-model="dialog" persistent max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-border-color</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="caption">
                  Sure you want to delete <b>{{item.productname}} </b> ?
                </v-card-title>
                
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false">
                    yes
                  </v-btn>
                  <v-btn color="green darken-1" text @click="dialog = false">
                    no
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-btn icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
       dialog: false,
    

    }
  },
  async asyncData({ $axios }) {
    const getProducts = await $axios.$get(
      'https://mrkayenterprise.herokuapp.com/api/v1/admin/viewproducts'
    )

    console.log(getProducts)

    return { getProducts }
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
