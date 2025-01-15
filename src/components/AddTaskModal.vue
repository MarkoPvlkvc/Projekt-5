<template>
  <div
    @click="toggleIsShownProp"
    :style="{
      display: isShownProp ? 'block' : 'none',
      position: 'absolute',
      inset: '0',
      backgroundColor: 'hsla(0, 0%, 10%, 0.8)',
      cursor: 'pointer',
    }"
  ></div>

  <div :style="{ display: isShownProp ? 'flex' : 'none' }" class="add-task-modal">
    <h1>Task<sup style="font-size: 16px; font-weight: 300; color: hsl(0, 0%, 50%)">(new)</sup></h1>

    <div style="display: flex; flex-direction: column; margin-top: 36px; gap: 16px">
      <div style="display: flex; flex-direction: column">
        <label
          for="new-task-title"
          style="margin-bottom: 4px; color: hsl(0, 0%, 50%); font-weight: 300; pointer-events: none"
          >Title</label
        >
        <input type="text" id="new-task-title" />
      </div>

      <div style="display: flex; flex-direction: column">
        <label
          for="new-task-description"
          style="margin-bottom: 4px; color: hsl(0, 0%, 50%); font-weight: 300; pointer-events: none"
          >Description</label
        >
        <input type="text" id="new-task-description" />
      </div>

      <button @click="handleFormSubmit" class="add-task-button">Add Task</button>
    </div>
  </div>
</template>

<style scoped>
.add-task-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: hsl(0, 0%, 10%);
  border: solid 1px hsl(0, 0%, 20%);
  padding: 24px;
  border-radius: 16px;
}

input {
  background: transparent;
  font-size: 16px;
  border: solid 1px hsl(0, 0%, 20%);
  border-radius: 8px;
  padding: 8px 12px;
  color: hsl(0, 0%, 80%);
  outline: transparent;
  transition: 0.1 ease-in all;
}
input:hover {
  border-color: hsl(0, 0%, 25%);
}
input:focus {
  border-color: hsl(0, 0%, 25%);
  background-color: hsl(0, 0%, 20%);
}

.add-task-button {
  margin: 12px auto 0px auto;
  width: fit-content;
  font-size: 14px;
  color: hsl(0, 0%, 80%);
  background: transparent;
  border: dashed 1px hsl(0, 0%, 20%);
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: 0.1 ease-in all;
}
.add-task-button:hover {
  border-style: solid 1px hsl(0, 0%, 25%);
  background: hsl(0, 0%, 20%);
  color: hsl(0, 0%, 100%);
}
</style>

<script lang="ts">
import { useTasksStore } from '@/stores/taskStore'
import { defineComponent, toRefs, watch } from 'vue'

export default defineComponent({
  name: 'AddTaskModal',
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const tasksStore = useTasksStore()
    const { addTask } = tasksStore

    const { modelValue: isShownProp } = toRefs(props)

    const toggleIsShownProp = () => {
      emit('update:modelValue', !isShownProp.value)
    }

    watch(isShownProp, () => {
      if (isShownProp.value) {
        setTimeout(() => {
          document.getElementById('new-task-title')!.focus()
        }, 100)
      }
    })

    const handleFormSubmit = (e: Event) => {
      e.preventDefault()

      const newTitle = document.getElementById('new-task-title')! as HTMLInputElement
      const newDescription = document.getElementById('new-task-description')! as HTMLInputElement

      if (newTitle.value === '' || newDescription.value === '') {
        return
      }

      addTask(newTitle.value, newDescription.value)
      toggleIsShownProp()

      newTitle.value = ''
      newDescription.value = ''
    }

    return {
      isShownProp,
      toggleIsShownProp,
      handleFormSubmit,
    }
  },
})
</script>
