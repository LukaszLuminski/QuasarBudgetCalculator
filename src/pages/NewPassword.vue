<template>
  <q-page class="bg-image row justify-center items-center">
    <unauth-header />
    <div class="column">
      <div class="row">
        <q-card rounded bordered class="auth-card q-px-md shadow-1">
          <div class="q-pa-sm">
            <q-card-section class="q-pb-none">
              <q-form ref="changePwdForm" class="q-gutter-sm q-pb-sm">
                <q-input
                  clearable
                  v-model="password"
                  :type="isPwd ? 'password' : 'text'"
                  label="New password"
                  lazy-rules
                  :rules="passwordRules"
                  ><template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility' : 'visibility_off'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    /> </template
                ></q-input>
                <q-input
                  clearable
                  v-model="repeatPassword"
                  :type="isRpdPwd ? 'password' : 'text'"
                  label="Repeat new password"
                  lazy-rules
                  :rules="repeatPasswordRules"
                  ><template v-slot:append>
                    <q-icon
                      :name="isRpdPwd ? 'visibility' : 'visibility_off'"
                      class="cursor-pointer"
                      @click="isRpdPwd = !isRpdPwd"
                    /> </template
                ></q-input>
              </q-form>
            </q-card-section>
            <q-card-actions class="q-px-md">
              <q-btn
                unelevated
                color="primary"
                size="lg"
                class="full-width q-mb-sm"
                label="Confirm"
                @click="changePassword"
              />
            </q-card-actions>
          </div>
        </q-card>
      </div>
    </div>
    <info-dialog
      :show="error"
      :message="message"
      @close="error = false"
      @input="error = false"
    />
    <change-pwd-dialog
      :token="getToken ? true : false"
      :show="success"
      :message="successMessage"
      @confirm="proceed"
    />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import ChangePwdDialog from 'src/templates/ChangePwdDialog.vue'
import axiosCall from './../utils/axiosCalls'
import UnauthHeader from './UnauthHeader.vue'
import InfoDialog from 'src/templates/InfoDialog.vue'
export default {
  components: { UnauthHeader, ChangePwdDialog, InfoDialog },
  name: 'NewPassword',
  data () {
    return {
      success: false,
      successMessage: null,
      error: false,
      message: null,
      isPwd: true,
      isRpdPwd: true,
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
  computed: {
    ...mapGetters(['getToken'])
  },
  methods: {
    proceed () {
      this.$router.push({ path: '/' })
    },
    async changePassword () {
      await this.$refs.changePwdForm.validate().then(success => {
        if (success) {
          axiosCall('POST', '/auth/reset-password', null, {
            code: this.$route.query.code,
            password: this.password,
            passwordConfirmation: this.repeatPassword
          })
            .then(() => {
              this.getToken ? this.successMessage = 'You have successfully changed your password! You can now go back.' : this.successMessage = 'You have successfully changed your password. You can now log in.'
              this.success = true
            })
            .catch(error => {
              error.response.data.message &&
              error.response.data.message[0].messages &&
              error.response.data.message[0].messages[0].message
                ? (this.message =
                    error.response.data.message[0].messages[0].message)
                : (this.message =
                    'An error occured: ' + 'Internal Server Error')
              this.error = true
            })
        }
      })
    }
  }
}
</script>
