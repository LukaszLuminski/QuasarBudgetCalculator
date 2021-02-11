<template>
  <q-page class="bg-image row justify-center items-center">
    <unauth-header />
    <div class="column">
      <div class="row">
        <q-card rounded bordered class="auth-card q-px-md shadow-1">
          <div class="q-pa-sm">
          <q-card-section class="q-pb-none">
            <q-form @reset="resetForm" ref="resetPasswordForm" class="q-gutter-sm q-pb-sm">
              <q-input clearable v-model="email" type="email" label="Your email" lazy-rules :rules="emailRules"/>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="primary" size="lg" class="full-width q-mb-sm" label="Reset password" @click="resetPassword" />
          </q-card-actions>
          </div>
        </q-card>
      </div>
    </div>
    <info-dialog
    :show="dialog"
    :message="message"
    @close="checkResStatus"
    @input="checkResStatus"
    />
  </q-page>
</template>

<script>
import InfoDialog from 'src/templates/InfoDialog.vue'
import axiosCall from './../utils/axiosCalls'
import UnauthHeader from '../templates/UnauthHeader'
export default {
  components: { UnauthHeader, InfoDialog },
  name: 'ResetPassword',
  data () {
    return {
      status: null,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

          return pattern.test(v) || 'E-mail must be valid.'
        }
      ],
      dialog: false,
      message: null
    }
  },
  methods: {
    resetForm () {
      this.email = ''
    },
    checkResStatus () {
      this.dialog = false
      if (this.status === 200) {
        this.$refs.resetPasswordForm.reset()
      }
    },
    async resetPassword () {
      await this.$refs.resetPasswordForm.validate().then(success => {
        if (success) {
          axiosCall('POST', '/auth/forgot-password', null, {
            email: this.email.trim()
          })
            .then((res) => {
              this.status = res.status
              this.message = 'You have successfully requested a new password. Please check your email for further instructions. If you cannot find them, check the \'Spam\' folder as well.'
              this.dialog = true
            })
            .catch(error => {
              this.status = error.response.status
              error.response.data.message && error.response.data.message[0].messages && error.response.data.message[0].messages[0].message ? this.message = error.response.data.message[0].messages[0].message : this.message = 'An error occured: ' + 'Internal Server Error'
              this.dialog = true
            })
        }
      })
    }
  }
}
</script>
