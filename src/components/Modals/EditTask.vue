<template>
  <q-card style="width:300px">
    <modal-header>Edit Task</modal-header>
    <q-form @submit.prevent="onSubmit">
      <q-card-section>
        <modal-name :name.sync="taskToSubmit.name" />
        <modal-date :date.sync="taskToSubmit.due_date" />
        <modal-time
          v-if="taskToSubmit.due_date"
          :time.sync="taskToSubmit.due_time"
        />
        <modal-buttons />
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['task', 'id'],
  data () {
    return {
      taskToSubmit: {}
    }
  },
  methods: {
    ...mapActions('tasks', ['updateTask']),
    onSubmit () {
      this.updateTask({
        id: this.id,
        updates: this.taskToSubmit
      })
      this.$emit('close')
    },
    clearDueDate () {
      this.taskToSubmit.due_date = ''
      this.taskToSubmit.due_time = ''
    }
  },
  components: {
    'modal-header': require('components/Modals/Shared/ModalHeader').default,
    'modal-name': require('components/Modals/Shared/ModalName').default,
    'modal-date': require('components/Modals/Shared/ModalDate').default,
    'modal-time': require('components/Modals/Shared/ModalTime').default,
    'modal-buttons': require('components/Modals/Shared/ModalButtons').default
  },
  mounted () {
    this.taskToSubmit = Object.assign({}, this.task)
  }
}
</script>
