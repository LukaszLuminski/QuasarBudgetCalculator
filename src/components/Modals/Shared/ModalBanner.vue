<template>
<q-banner inline-actions :class="bgColor" class="list-banner text-white text-center">
      <span class="text-subtitle1 text-bold"><slot></slot></span>
    </q-banner>
</template>

<script>
export default {
  name: 'ModalBanner',
  props: ['bgColor']
}
</script>

<style lang="scss" scoped>
  .list-banner {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
</style>
