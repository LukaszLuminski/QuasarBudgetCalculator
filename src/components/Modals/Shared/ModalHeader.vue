<template>
<q-card-section class="row items-center">
        <div class="text-h6"><slot></slot></div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
</template>

<script>
export default {
}
</script>
