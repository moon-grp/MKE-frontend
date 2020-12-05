<template>
  <div>
    <v-row class="justify-center mt-6 fnt mb-8">
      <v-card class="mx-auto" min-width="500">
        <v-text-field
          label="product name"
          outlined
          class="mx-8 mt-8 text-capitalize"
          color="#6C63FF"
        ></v-text-field>

        <v-textarea
          outlined
          name="input-7-4"
          label="Product description"
          class="mx-8 mt-2 text-capitalize"
          color="#6C63FF"
        ></v-textarea>

        <v-text-field
          label="product price"
          outlined
          class="mx-8 mt-2 text-capitalize"
          color="#6C63FF"
        ></v-text-field>

        <v-text-field
          label="product slash price"
          outlined
          class="mx-8 mt-2 text-capitalize"
          color="#6C63FF"
        ></v-text-field>

        <v-file-input
          accept="image/*"
          label="Product image"
          class="mx-8 mt-2"
          color="#6C63FF"
        ></v-file-input>

        <v-card-actions>
          <v-btn text dark color="#6C63FF" class="ml-6 mt-2"> upload product </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

.fnt {
  font-family: 'Poppins', sans-serif;
  font-size: 10px;
}
</style>
