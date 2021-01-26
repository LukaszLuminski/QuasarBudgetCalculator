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

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="180"
      content-class="bg-grey-1"
      :breakpoint="783"
    >
      <q-list class="q-mt-sm">
        <q-item v-for="nav in navs" :key="nav.label" :to="nav.to" exact clickable>
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{nav.label}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated>
        <q-tabs
      >
        <q-route-tab v-for="nav in navs" :key="nav.label" :icon="nav.icon" :label="nav.label" :to="nav.to"/>
      </q-tabs>
      </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'AuthLayout',

  data () {
    return {
      leftDrawerOpen: false,
      navs: [
        {
          label: 'Todo',
          icon: 'list',
          to: '/'
        },
        {
          label: 'Settings',
          icon: 'settings',
          to: '/settings'
        }
      ]
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
