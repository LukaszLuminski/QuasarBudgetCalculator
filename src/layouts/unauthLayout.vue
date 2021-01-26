<template>
  <q-layout view="hHh lpr fFf">
    <div id="main-header">
      <div class="text-center text-h4 gt-xs">
          Welcome to budgetCalculator!
      </div>
      <div class="text-center text-h5 lt-sm">
          Welcome to budgetCalculator!
      </div>
    </div>
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
