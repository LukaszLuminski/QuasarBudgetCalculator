<template>
  <q-page class="bg-image row justify-center items-center">
    <unauth-header />
    <div class="column">
      <div class="row">
        <q-card rounded bordered class="auth-card q-px-md shadow-1">
          <div class="q-pa-sm">
            <q-card-section>
              <q-form ref="loginForm" class="q-pb-sm">
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
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility' : 'visibility_off'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </q-form>
            </q-card-section>
            <q-card-actions class="q-px-md">
              <q-btn
                unelevated
                color="primary"
                size="lg"
                class="full-width"
                label="Login"
                @click="login"
              />
              <q-btn
                unelevated
                color="primary"
                icon="fab fa-facebook"
                label="Login with Facebook"
                class="full-width q-pa-xs q-mt-md"
                size="md"
                @click="auth('facebook')"
              />
            </q-card-actions>
            <q-card-section class="text-center q-pa-none">
              <p class="text-grey-8 q-pt-md">
                Not registered? Create an
                <span @click="register" class="cursor-pointer text-primary"
                  >account</span
                >
              </p>
              <p
                @click="resetPassword"
                class="cursor-pointer text-grey-8 text-caption q-pb-sm"
              >
                I forgot my password
              </p>
            </q-card-section>
          </div>
        </q-card>
      </div>
    </div>
    <info-dialog
      :show="error"
      :message="message"
      @close="error = false"
      @input="error = false" />
    <info-dialog
      :show="firstLogin"
      :message="successMessage"
    />
  </q-page>
</template>

<script>
import InfoDialog from 'src/templates/InfoDialog.vue'
import { mapGetters } from 'vuex'
import UnauthHeader from '../templates/UnauthHeader'
export default {
  components: { UnauthHeader, InfoDialog },
  name: 'Login',
  data () {
    return {
      firstLogin: false,
      successMessage:
        'Congratulations! You have successfully confirmed your account. You can now log in.',
      error: false,
      message: null,
      isPwd: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

          return pattern.test(v) || 'E-mail must be valid.'
        }
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
      ]
    }
  },
  computed: {
    ...mapGetters(['getError'])
  },
  created () {
    if (this.$route.query.email_confirmation) this.firstLogin = true
  },
  methods: {
    auth (network) {
      this.$hello(network).login()
        .then((res) => {
          console.log(res)
        })
    },
    register () {
      this.$router.push({ path: '/register' })
    },
    async login () {
      await this.$refs.loginForm.validate().then(success => {
        if (success) {
          this.$store
            .dispatch('onLogin', {
              formData: {
                identifier: this.email.trim(),
                password: this.password
              }
            })
            .then(() => {
              if (this.getError) {
                this.error = true
                this.message = this.getError
              }
            })
        }
      })
    },
    resetPassword () {
      this.$router.push({ path: '/reset-password', query: { auth: 'false' } })
    }
  }
}
</script>
