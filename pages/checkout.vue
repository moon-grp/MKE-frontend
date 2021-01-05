<template>
  <div>
    <v-row class="justify-center mt-6 fnt mb-8">
      <v-card class="mx-auto" min-width="500">
        <v-text-field
          label="Name"
          outlined
          class="mx-8 mt-8 text-capitalize"
          color="#6C63FF"
          v-model="name"
          :error-messages="nameError"
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>

        <v-text-field
          label="Email"
          outlined
          class="mx-8 mt-2 text-capitalize"
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
            @click="openPaystack"
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
import axios from 'axios'
import { mapState } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
export default {
  layout: 'frames',

  head() {
    return {
      script: [{ src: 'https://js.paystack.co/v1/inline.js' }],
    }
  },
  mixins: [validationMixin],

  validations: {
    email: { required },
    address: { required },
    phoneNumber: { required },
    name: { required },
  },
  data() {
    return {
      email: '',
      address: '',
      phoneNumber: '',
      name: '',
    }
  },
  computed: {
    ...mapState({
      details: (state) => state.productDetails,
    }),
    nameError() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('name is required')
      return errors
    },
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
  methods: {
    openPaystack() {
      console.log(this.details)
      var name = this.name
      var email = this.email
      var phone = this.phoneNumber
      var address = this.address
      var qtr = this.details.qty
      var productname = this.details.productName
      var key = process.env.pAPI_KEY

      var handler = PaystackPop.setup({
        key: key,
        email: 'olumidemm@gmail.com',
        amount: this.details.price,
        ref: '' + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        metadata: {
          custom_fields: [
            {
              display_name: 'Mobile Number',
              variable_name: 'mobile_number',
              value: '+2348012345678',
            },
          ],
        },
        callback: async function (response) {
          //  alert('success. transaction ref is ' + response.reference);
          axios
            .post(
              `https://mrkayenterprise.herokuapp.com/api/v1/user/payproduct`,
              {
                referenceCode: response.reference,
                customerName: name,
                customerEmail: email,
                customerPhone: phone,
                customerAddress: address,
                qtr: qtr,
                productName: productname,
              }
            )
            .then((res) => {
              console.log(res)
            })

          console.log(name)
        },
        onClose: function () {},
      })
      handler.openIframe()
    },

  },
  
}
</script>
