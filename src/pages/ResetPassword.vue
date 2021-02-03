<template>
  <q-page class="bg-image row justify-center items-center">
    <unauth-header />
    <div class="column">
      <div class="row">
        <q-card rounded bordered class="auth-card q-px-md shadow-1">
          <div class="q-pa-sm">
          <q-card-section>
            <q-form class="q-gutter-sm q-pb-sm">
              <q-input clearable v-model="email" type="email" label="Your email" lazy-rules :rules="emailRules"/>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="primary" size="lg" class="full-width q-mb-sm" label="Reset password" />
          </q-card-actions>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import UnauthHeader from './UnauthHeader.vue'
export default {
  components: { UnauthHeader },
  name: 'ResetPassword',
  data () {
    return {
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

          return pattern.test(v) || 'E-mail must be valid.'
        }
      ]
    }
  },
  methods: {
  }
}
</script>
