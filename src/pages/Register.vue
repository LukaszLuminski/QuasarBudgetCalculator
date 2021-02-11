<template>
  <q-page class="bg-image row justify-center items-center">
    <unauth-header />
    <div class="column">
      <div class="row">
        <q-card rounded bordered class="auth-card q-px-md q-pb-md shadow-1">
          <q-card-section>
            <q-form lazy-validation @reset="resetForm" ref="registerForm" class="q-pt-sm">
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
                    :name="isPwd ? 'visibility' : 'visibility_off'"
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
                @keyup.enter.native="register"
                ><template v-slot:append>
                  <q-icon
                    :name="isRpdPwd ? 'visibility' : 'visibility_off'"
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
              @click="register"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <info-dialog
    :show="dialog"
    :message="message"
    @close="checkResStatus"
    @input="checkResStatus"
    />
    <q-overlay v-model="waiting" :no-scroll="true" :z-index="5000">
      <template #body>
        <div class="fullscreen row justify-evenly items-center">
          <q-spinner v-if="waiting === true" color="primary" size="5em"></q-spinner>
        </div>
      </template>
    </q-overlay>
  </q-page>
</template>

<script>
import InfoDialog from 'src/templates/InfoDialog.vue'
import axiosCall from './../utils/axiosCalls'
import UnauthHeader from '../templates/UnauthHeader'
export default {
  components: { UnauthHeader, InfoDialog },
  name: 'Login',
  data () {
    return {
      waiting: false,
      dialog: false,
      message: null,
      isPwd: true,
      isRpdPwd: true,
      firstName: null,
      firstNameRules: [v => !!v || 'Your first name is required'],
      email: null,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      password: null,
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
      repeatPassword: null,
      repeatPasswordRules: [v => v === this.password || 'Password must match']
    }
  },
  methods: {
    resetForm () {
      this.firstName = this.email = this.password = this.repeatPassword = null
    },
    checkResStatus () {
      this.dialog = false
      if (this.status === 200) {
        this.$refs.registerForm.reset()
      }
    },
    async register () {
      await this.$refs.registerForm.validate().then(success => {
        if (success) {
          this.waiting = true
          axiosCall('POST', '/auth/local/register', null, {
            username: this.firstName,
            email: this.email,
            password: this.password
          })
            .then((res) => {
              this.status = res.status
              this.message = 'You have successfully registered your account. Please check your email for further instructions'
              this.dialog = true
              this.waiting = false
            })
            .catch(err => {
              this.status = err.response.status
              this.message = err.response.data.message[0] ? err.response.data.message[0].messages[0].message : 'A server error has occured. Please contact your developer'
              this.dialog = true
              this.waiting = false
            })
        }
      })
    }
  }
}
</script>
