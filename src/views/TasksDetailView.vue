<template lang="">
  <main>
    <div
      style="
        position: relative;
        width: 450px;
        display: flex;
        flex-direction: column;
        padding: 192px 0px 64px 0px;
      "
    >
      <h1>
        Task<sup style="font-size: 16px; font-weight: 300; color: hsl(0, 0%, 50%)"
          >(id: {{ route.path.split('/')[2] }})</sup
        >
      </h1>

      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 24px;
          margin-top: 36px;
          border: solid 1px hsl(0, 0%, 20%);
          border-radius: 8px;
          padding: 16px;
        "
      >
        <div style="display: flex; flex-direction: column; gap: 4px">
          <p style="color: hsl(0, 0%, 50%); font-weight: 300">Task title</p>
          <p style="font-size: 18px; font-weight: 500">{{ task.title }}</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 4px">
          <p style="color: hsl(0, 0%, 50%); font-weight: 300">Task description</p>
          <p style="font-size: 18px; font-weight: 500">{{ task.description }}</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 4px">
          <p style="color: hsl(0, 0%, 50%); font-weight: 300">Task completed</p>
          <p style="font-size: 18px; font-weight: 500">{{ task.completed ? 'Yes' : 'No' }}</p>
        </div>
      </div>

      <RouterLink
        to="/"
        style="color: hsl(0, 0%, 90%); font-weight: 400; margin: 36px auto 0px auto"
        >Go back</RouterLink
      >
    </div>
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
</style>

<script lang="ts">
import { useTasksStore } from '@/stores/taskStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const tasksStore = useTasksStore()
    const { tasks, tasksFetched } = storeToRefs(tasksStore)
    const { fetchTasks } = tasksStore

    const taskId = computed(() => Number(route.path.split('/')[2]))
    const task = computed(() => tasks.value.find((task) => task.id === taskId.value))

    onMounted(() => {
      if (!tasksFetched.value) {
        fetchTasks()
      }
    })

    return {
      route,
      task,
    }
  },
}
</script>
