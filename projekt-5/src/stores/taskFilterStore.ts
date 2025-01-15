import { defineStore } from 'pinia'

type TaskFilter = 'all' | 'completed' | 'uncompleted'

export const useTaskFilterStore = defineStore('taskFilter', {
  state: () => ({
    selectedFilter: 'all' as TaskFilter,
  }),

  actions: {
    setFilter(filter: TaskFilter) {
      this.selectedFilter = filter
    },
  },
})
