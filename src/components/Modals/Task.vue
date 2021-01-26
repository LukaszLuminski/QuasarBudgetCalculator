<template>
  <q-item
    tag="label"
    @click="updateTask({ id: id, updates: { completed: !task.completed } })"
    :class="!task.completed ? 'bg-orange-1' : 'bg-green-2'"
    v-ripple
  >
    <q-item-section side top>
      <q-checkbox no-pointer-events :value="task.completed" />
    </q-item-section>

    <q-item-section>
      <q-item-label :class="{ 'text-strikethrough': task.completed }">{{
        task.name
      }}</q-item-label>
    </q-item-section>
    <q-item-section v-if="task.due_date" side>
      <q-item-label><q-icon name="event" /> {{ task.due_date }}</q-item-label>
      <small
        ><q-item-label>{{ task.due_time }}</q-item-label></small
      >
    </q-item-section>
    <q-btn
      @click.stop="showEditTask = true"
      class="q-ml-lg"
      flat
      round
      color="primary"
      icon="create"
    />
    <q-btn
    dense
      @click.stop="promptToDelete(id)"
      class="q-ml-sm"
      flat
      round
      color="red"
      icon="delete_forever"
    />
    <q-dialog v-model="showEditTask">
     <edit-task @close="showEditTask = false" :task="task" :id="id" />
    </q-dialog>
  </q-item>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['task', 'id'],
  data () {
    return {
      showEditTask: false
    }
  },
  methods: {
    ...mapActions('tasks', ['updateTask', 'deleteTask']),
    promptToDelete (id) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Do you really want to delete this item?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.deleteTask(id)
        })
    },
    edit (id) {
      console.log(id)
    }
  },
  components: {
    'edit-task': require('components/Modals/EditTask').default
  }
}
</script>

<style scoped></style>
