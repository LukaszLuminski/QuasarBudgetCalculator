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
        <q-card rounded bordered class="auth-card q-px-md shadow-1">
          <div class="q-pa-sm">
            <q-card-section>
              <q-form class="q-pb-sm">
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
                    :name="isPwd ? 'visibility_off' : 'visibility'"
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
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
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
  methods: {
    register () {
      this.$router.push({ path: '/register' })
    },
    resetPassword () {
      this.$router.push({ path: '/reset-password', query: { auth: 'false' } })
    }
  }
}
</script>
