<template>
  <q-page class="bg-image row justify-center items-center">
    <div class="q-mr-auto" id="unauth-header">
      <div class="text-h4 gt-xs">
        budgetCalculator
      </div>
      <div class="text-h5 lt-sm">
        budgetCalculator
      </div>
    </div>
    <div class="column">
      <div class="row">
        <q-card rounded bordered class="auth-card q-px-md q-pb-md shadow-1">
          <q-card-section>
            <q-form ref="registerForm" @submit="register" class="q-pt-sm">
              <q-input
                clearable
                v-model="firstName"
                type="text"
                label="First name"
                lazy-rules
                :rules="firstNameRules"
              />
              <q-input
                clearable
                v-model="email"
                type="email"
                label="Email"
                lazy-rules
                :rules="emailRules"
              />
              <q-input
                clearable
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
                label="Password"
                lazy-rules
                :rules="passwordRules"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <q-input
                clearable
                v-model="repeatPassword"
                :type="isRpdPwd ? 'password' : 'text'"
                label="Repeat password"
                lazy-rules
                :rules="repeatPasswordRules"
                ><template v-slot:append>
                  <q-icon
                    :name="isRpdPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isRpdPwd = !isRpdPwd"
                  /> </template
              ></q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md q-pt-none q-pb-md">
            <q-btn
              unelevated
              color="primary"
              size="lg"
              type="submit"
              class="full-width"
              label="Register"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      isPwd: true,
      isRpdPwd: true,
      firstName: '',
      firstNameRules: [v => !!v || 'Your first name is required'],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
          return (
            pattern.test(v) ||
            'Min. 8 characters with at least one capital letter, a number and a special character.'
          )
        }
      ],
      repeatPassword: '',
      repeatPasswordRules: [v => v === this.password || 'Password must match']
    }
  },
  methods: {
    register () {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          console.log('Success')
        } else {
          console.log('fail')
          // oh no, user has filled in
          // at least one invalid value
        }
      })
    }
  }
}
</script>
