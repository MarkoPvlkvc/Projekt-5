<template>
  <main>
    <div
      style="
        position: relative;
        width: 450px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 192px 0px 64px 0px;
      "
    >
      <div style="display: flex; justify-content: space-between; width: 100%">
        <h1>
          Tasks<sup style="font-size: 16px; font-weight: 300; color: hsl(0, 0%, 50%)"
            >({{ taskCount }})</sup
          >
        </h1>
        <button @click="toggleAddTaskModal" :disabled="loading" class="add-task-button">
          Add Task
        </button>
      </div>

      <TaskFilter />

      <ul class="task-container" v-auto-animate>
        <TaskItem
          v-for="task in filteredTasks"
          :key="task.id"
          :task="task"
          @toggleTask="toggleTaskCompletion"
        />
      </ul>

      <img src="/src/assets/load.svg" alt="loading icon" v-if="loading" class="loading-icon" />
    </div>

    <AddTaskModal v-model="addTaskModalShown" />
  </main>
</template>

<style scoped>
main {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
}

.loading-icon {
  margin-top: 72px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.task-container {
  margin-top: 12px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: 2s ease-in-out;
  transition-property: height;
}

.add-task-button {
  font-size: 14px;
  color: hsl(0, 0%, 80%);
  background: transparent;
  border: dashed 1px hsl(0, 0%, 20%);
  border-radius: 8px;
  padding: 4px 12px;
  transition: 0.1 ease-in all;
}
.add-task-button:not(:disabled):hover {
  background-color: hsl(0, 0%, 20%);
  border-color: hsl(0, 0%, 25%);
  border-style: solid;
  cursor: pointer;
}
.add-task-button:disabled {
  color: hsl(0, 0%, 50%);
}
</style>

<script lang="ts">
import TaskItem from '@/components/TaskItem.vue'
import TaskFilter from '@/components/TaskFilter.vue'
import AddTaskModal from '@/components/AddTaskModal.vue'

import { computed, onMounted, ref } from 'vue'
import { useTasksStore } from '@/stores/taskStore'
import { storeToRefs } from 'pinia'
import { useTaskFilterStore } from '@/stores/taskFilterStore'

export default {
  components: {
    TaskItem,
    TaskFilter,
    AddTaskModal,
  },

  setup() {
    const tasksStore = useTasksStore()
    const { tasks, loading, error, tasksFetched } = storeToRefs(tasksStore)
    const { fetchTasks, toggleTaskCompletion } = tasksStore

    const taskFilterStore = useTaskFilterStore()
    const { selectedFilter } = storeToRefs(taskFilterStore)

    const addTaskModalShown = ref(false)

    onMounted(() => {
      if (!tasksFetched.value) {
        fetchTasks()
      }
    })

    const taskCount = computed(() => {
      return tasks.value.filter((task) => !task.completed).length
    })

    const filteredTasks = computed(() => {
      if (selectedFilter.value === 'all') {
        return tasks.value
      } else if (selectedFilter.value === 'completed') {
        return tasks.value.filter((task) => task.completed)
      } else {
        return tasks.value.filter((task) => !task.completed)
      }
    })

    const toggleAddTaskModal = () => {
      addTaskModalShown.value = !addTaskModalShown.value
    }

    return {
      filteredTasks,
      loading,
      error,
      toggleTaskCompletion,
      taskCount,
      addTaskModalShown,
      toggleAddTaskModal,
    }
  },
}
</script>
