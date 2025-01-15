<template>
  <div style="display: flex; align-items: center; gap: 8px; margin-left: auto; margin-top: 36px">
    <label for="task-filter" style="font-weight: 300; color: hsl(0, 0%, 50%); font-size: 14px"
      >Filter Tasks:
    </label>
    <select id="task-filter" :disabled="loading" class="task-filter" v-model="selectedFilter">
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="uncompleted">Uncompleted</option>
    </select>
  </div>
</template>

<style>
.task-filter {
  font-size: 14px;
  color: hsl(0, 0%, 80%);
  padding: 8px 28px 8px 12px;
  background: url('/src/assets/down-line.svg') no-repeat right 8px center;
  background-size: 16px;
  border: solid 1px hsl(0, 0%, 20%);
  border-radius: 8px;
  appearance: none;
}
.task-filter:not(:disabled):hover {
  background-color: hsl(0, 0%, 20%);
  border-color: hsl(0, 0%, 25%);
  cursor: pointer;
}
.task-filter:disabled {
  color: hsl(0, 0%, 50%);
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTaskFilterStore } from '@/stores/taskFilterStore'
import { storeToRefs } from 'pinia'
import { useTasksStore } from '@/stores/taskStore'

export default defineComponent({
  name: 'TaskFilter',
  setup() {
    const tasksStore = useTasksStore()
    const { loading } = storeToRefs(tasksStore)

    const taskFilterStore = useTaskFilterStore()
    const { selectedFilter } = storeToRefs(taskFilterStore)

    return {
      selectedFilter,
      loading,
    }
  },
})
</script>
