import { defineStore } from 'pinia'

interface Task {
  id: number
  title: string
  description: string
  completed: boolean
}

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: <Task[]>[],
    loading: false,
    error: '',
    tasksFetched: false,
  }),
  actions: {
    async fetchTasks() {
      this.loading = true

      try {
        const response = await fetch(
          'https://run.mocky.io/v3/54a8f63d-deff-4d49-8b78-f14bd07bca22?mocky-delay=3s',
        )

        if (!response.ok) {
          throw new Error('API Error')
        }

        const data = await response.json()
        this.tasks = data.tasks
      } catch (err) {
        this.error = (err as ErrorEvent).message
      } finally {
        this.loading = false
        this.tasksFetched = true
      }
    },

    toggleTaskCompletion(taskId: number, completed: boolean) {
      const task = this.tasks.find((task) => task.id === taskId)
      if (task) {
        task.completed = completed
      }
    },

    addTask(title: string, description: string) {
      this.tasks.push({ id: this.tasks.length, title, description, completed: false })
    },
  },
})
