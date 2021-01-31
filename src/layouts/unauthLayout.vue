<template>
  <q-layout view="hHh lpr fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'UnauthLayout',

  data () {
    return {
    }
  }
}
</script>
<style lang="scss">
  footer {
    @media (min-width: 767px) {
      display: none;
    }
  }
</style>
