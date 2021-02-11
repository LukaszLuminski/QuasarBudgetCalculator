<template>
  <q-dialog
  @input="emitInput"
  :value="show">
      <q-card class='info-card'>

        <q-card-section class="q-pt-xl q-px-lg">
          {{ message }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" @click="closeDialog" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
export default {
  name: 'InfoDialog',
  props: {
    show: {
      type: Boolean
    },
    message: {
      type: String || null
    }
  },
  methods: {
    closeDialog () {
      this.$emit('close')
    },
    emitInput () {
      this.$emit('input')
    }
  }
}
</script>

<style lang="scss" scoped>
 .info-card {
   max-width: 600px !important;
 }
</style>
