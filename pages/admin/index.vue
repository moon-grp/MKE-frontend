<template>
  <div>
    <div id="boxSpace">
      <v-row class="justify-center mb-8">
        <div class="fnt text-capitalize">sign in to admin dashboard<span class="coll">.</span></div>
      </v-row>
      <v-row class="justify-center">
        <div class="divl">
          <v-text-field
            outlined
            label="Password"
            prepend-inner-icon="mdi-key"
            class="text-capitalize tf"
            color="#6C63FF"
            v-model="password"
            :error-messages="passwordErros"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
            type="password"
          ></v-text-field>
        </div>
      </v-row>
      <v-row class="justify-center">
        <div>
          <v-btn
            color="#6C63FF"
            class="fnt-p trs"
            outlined
            dark
            @click="signIn"
            :loading="loading"
          >
            sign in
          </v-btn>
        </div>
      </v-row>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
export default {
  layout: 'admin',
  mixins: [validationMixin],

  validations: {
    password: { required, minLength: minLength(8) },

    email: { required, email },
  },
  data() {
    return {
      password: null,
    }
  },
  computed: {
    passwordErros() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength &&
        errors.push('Password must be at most 8 characters long')
      !this.$v.password.required && errors.push('Your password is required.')
      return errors
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

#boxSpace {
  margin-top: 5%;
  margin-bottom: 10%;
}

.tf {
  border-radius: 10px;
}

.divl {
  width: 50vw;
}

.fnt {
  font-family: 'Poppins', sans-serif;
  font-size: 50px;
}

.coll {
  color: #6c63ff;
  font-size: 70px;
}
</style>
