<template>
<q-input
        clearable
          class="q-pb-sm"
          outlined
          :value="date"
          @input="$emit('update:date', $event)"
          mask="date"
          label="Due date"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date @input="$emit('update:date', $event)" :value="date">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
</template>

<script>
export default {
  props: ['date']
}
</script>
