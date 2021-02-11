<template>
  <q-dialog persistent :value="show">
    <q-card class="info-card">
      <q-card-section class="q-px-lg q-mt-sm q-pt-lg q-pb-lg">
        {{ message }}
      </q-card-section>

      <q-card-actions align="center">
        <q-btn
          unelevated
          color="primary"
          size="md"
          class="full-width"
          :label="token ? 'GO BACK' : 'LOG IN'"
          @click="confirm"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'ChangePwdDialog',
  props: {
    show: {
      type: Boolean
    },
    token: {
      type: Boolean
    },
    message: {
      type: String || null
    }
  },
  methods: {
    confirm () {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
.info-card {
  max-width: 600px !important;
}
</style>
