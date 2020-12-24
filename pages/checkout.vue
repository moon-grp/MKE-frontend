<template>
  <div>
    {{details.productName}}
    <v-row class="justify-center mt-6 fnt mb-8">
      <v-card class="mx-auto" min-width="500">
        <v-text-field
          label="Email"
          outlined
          class="mx-8 mt-8 text-capitalize"
          color="#6C63FF"
          v-model="email"
          :error-messages="emailError"
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>

        <v-text-field
          label="Phone Number"
          outlined
          class="mx-8 mt-2 text-capitalize"
          color="#6C63FF"
          type="number"
          :error-messages="phoneNumberError"
          @input="$v.phoneNumber.$touch()"
          @blur="$v.phoneNumber.$touch()"
          v-model="phoneNumber"
        ></v-text-field>

        <v-textarea
          outlined
          name="input-7-4"
          label="Address"
          class="mx-8 mt-2 text-capitalize"
          color="#6C63FF"
          v-model="address"
          :error-messages="addressError"
          @input="$v.address.$touch()"
          @blur="$v.address.$touch()"
        ></v-textarea>

        <v-card-actions>
          <v-btn
            outlined
            dark
            color="#6C63FF"
            @click="uploadProduct"
            :loading="loading"
            class="ml-6 mt-2 text-capitalize"
          >
            pay
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="success">
      {{ msg }}
    </v-snackbar>
    <v-snackbar v-model="snackbarErr" :timeout="timeout" color="error">
      {{ msg }}
    </v-snackbar>
  </div>
</template>

<script>
import {mapState} from "vuex"
import { validationMixin } from 'vuelidate'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
export default {
  layout: 'frames',
  mixins: [validationMixin],

  validations: {
    email: { required },
    address: { required },
    phoneNumber: { required },
  },
  data() {
    return {
      email: '',
      address: '',
      phoneNumber: '',
    }
  },
  computed: {
    ...mapState({
      details: state => state.productDetails
    }
    ),
    emailError() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push('email is required')
      return errors
    },
    addressError() {
      const errors = []
      if (!this.$v.address.$dirty) return errors
      !this.$v.address.required && errors.push('Address is required')
      return errors
    },
    phoneNumberError() {
      const errors = []
      if (!this.$v.phoneNumber.$dirty) return errors
      !this.$v.phoneNumber.required && errors.push('Phone number is required')
      return errors
    },
  },
}
</script>
