<template>
  <q-input
    clearable
    outlined
    :value="time"
    @input="$emit('update:time', $event)"
    mask="time"
    label="Due time"
  >
    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-time @input="$emit('update:time', $event)" :value="time">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  props: ['time']
}
</script>
