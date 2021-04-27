<template>
  <div>
    <v-row class="justify-center mt-4 fnt mb-8">
      <v-container>
        <div class="ml-8">
          <h2 class="text-capitalize ti">checkout</h2>
          <hr class="new4" />
        </div>

        <v-row class="mt-4">
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Name"
              outlined
              type="text"
              class="mx-8 text-capitalize"
              color="#13274a"
              v-model="name"
              :error-messages="nameError"
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Email"
              type="email"
              outlined
              class="mx-8 text-capitalize"
              color="#13274a"
              v-model="email"
              :error-messages="emailError"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              label="Phone Number"
              outlined
              class="mx-8 text-capitalize"
              color="#13274a"
              type="number"
              :error-messages="phoneNumberError"
              @input="$v.phoneNumber.$touch()"
              @blur="$v.phoneNumber.$touch()"
              v-model="phoneNumber"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-text-field
              outlined
              label="Address"
              class="mx-8 text-capitalize"
              color="#13274a"
              v-model="address"
              type="text"
              :error-messages="addressError"
              @input="$v.address.$touch()"
              @blur="$v.address.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="ml-4">
          <v-col cols="12" sm="6" md="8">
            <v-btn
              dark
              color="#13274a"
              @click="openPaystack"
              :loading="loading"
              class="mt-2 text-capitalize"
              block
              rounded
              x-large
            >
              checkout
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
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
      timeout: 7000,
      msg: '',
      snackbar: false,
      snackbarErr: false,
      loading: false,
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
      this.$v.$touch()
      if (!this.$v.$invalid) {
        console.log(this.details)
        var name = this.name
        var email = this.email
        var phone = this.phoneNumber
        var address = this.address
        var qtr = this.details.qty
        var productname = this.details.productName
        var key = process.env.pAPI_KEY

        //  var key ="pk_test_20beb29a9cd24d4c35105da9ac30711fd5978f3b"

        var handler = PaystackPop.setup({
          key: key,
          email: email,
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
      }
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
.Text {
  font-family: 'Poppins', sans-serif;
  font-size: 25px;
  color: #13274a;
}

a {
  text-decoration: none;
}

hr.new4 {
  border: 1px solid #13274a;
  width: 80px;
}

h2.ti {
  font-family: 'Montserrat', sans-serif;
  color: #2a2a2a;
  letter-spacing: 2.2px;
}

.v-text-field {
  border-radius: 40px;
}
</style>
