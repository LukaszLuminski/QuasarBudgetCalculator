import Vue from 'vue'
import { uid } from 'quasar'

const state = {
  tasks: {
    id1: {
      name: 'Go to shop',
      completed: false,
      due_date: '2020/12/19',
      due_time: '18:00'
    },
    id2: {
      name: 'Wash the car',
      completed: false,
      due_date: '2020/12/20',
      due_time: '15:00'
    },
    id3: {
      name: 'Send letter',
      completed: false,
      due_date: '2020/12/22',
      due_time: '16:00'
    }
  }
}

const mutations = {
  updateTask (state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates)
  },
  deleteTask (state, id) {
    Vue.delete(state.tasks, id)
  },
  addTask (state, payload) {
    Vue.set(state.tasks, payload.id, payload.task)
  }
}

const actions = {
  updateTask ({ commit }, payload) {
    commit('updateTask', payload)
  },
  deleteTask ({ commit }, id) {
    commit('deleteTask', id)
  },
  addTask ({ commit }, task) {
    const taskId = uid()
    const payload = {
      id: taskId,
      task: task
    }
    commit('addTask', payload)
  }
}

const getters = {
  tasksToDo: (state) => {
    const tasks = {}
    Object.keys(state.tasks).forEach(key => {
      const task = state.tasks[key]
      if (!task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  },
  tasksCompleted: (state) => {
    const tasks = {}
    Object.keys(state.tasks).forEach(key => {
      const task = state.tasks[key]
      if (task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
