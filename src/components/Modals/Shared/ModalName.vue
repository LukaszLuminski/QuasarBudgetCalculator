<template>
<q-input
          autofocus
          clearable
          class="q-mb-md"
          :rules="[val => !!val || 'Field is required']"
          outlined
          :value="name"
          @input="$emit('update:name', $event)"
          label="Task name"
        />
</template>

<script>
export default {
  props: ['name']
}
</script>
