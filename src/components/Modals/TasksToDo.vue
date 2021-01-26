<template>
<div>
  <banner
  v-if="Object.keys(tasksToDo).length"
  bgColor="bg-orange"
  >Todo</banner>
<q-list bordered separator>
    <task
    v-for="(task, key) in tasksToDo"
    :key="key"
    :task="task"
    :id="key"
    ref="task"
    >
    </task>
  </q-list>
</div>
</template>

<script>
export default {
  name: 'TasksToDo',
  props: ['tasksToDo'],
  components: {
    task: require('components/Modals/Task').default,
    banner: require('components/Modals/Shared/ModalBanner').default
  }
}
</script>
