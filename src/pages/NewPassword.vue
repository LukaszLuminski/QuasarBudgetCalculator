<template>
  <q-page class="bg-image row justify-center items-center">
    <div class="column">
      <div class="row">
        <q-card rounded bordered class="auth-card q-px-md shadow-1">
          <div class="q-pa-sm">
          <q-card-section>
            <q-form class="q-gutter-sm q-pb-sm">
              <q-input clearable v-model="password" type="password" label="New password" lazy-rules :rules="passwordRules"/>
               <q-input clearable v-model="repeatPassword" type="password" label="Repeat new password" lazy-rules :rules="repeatPasswordRules"/>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="primary" size="lg" class="full-width q-mb-sm" label="Confirm" />
          </q-card-actions>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'NewPassword',
  data () {
    return {
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
  }
}
</script>
