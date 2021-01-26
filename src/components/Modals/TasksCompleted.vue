<template>
<div class="q-mt-lg">
  <banner
  v-if="Object.keys(tasksCompleted).length"
  bgColor="bg-green-4"
  >Completed</banner>
    <q-list class="q-mb-lg" separator>
    <task
    v-for="(task, key) in tasksCompleted"
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
  name: 'TasksCompleted',
  props: ['tasksCompleted'],
  components: {
    task: require('components/Modals/Task').default,
    banner: require('components/Modals/Shared/ModalBanner').default
  }
}
</script>
