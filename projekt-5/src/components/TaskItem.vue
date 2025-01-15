<template>
  <li class="task">
    <input type="checkbox" v-model="taskProp.completed" class="task-checkbox" />
    <div>
      <p class="task-title">{{ taskProp.title }}</p>
      <p class="task-description">{{ taskProp.description }}</p>
    </div>
    <div class="task-checkbox-fake"></div>
  </li>
</template>

<style scoped>
.task {
  position: relative;
  display: flex;
  gap: 30px;
  padding: 16px;
  border: solid 1px hsl(0, 0%, 20%);
  border-radius: 8px;
  transition: 0.1s ease-in all;
  overflow: hidden;
}
.task:hover {
  border-color: hsl(0, 0%, 25%);
  background-color: hsl(0, 0%, 15%);
}

.task-title {
  font-size: 18px;
  font-weight: 600;
}
.task-description {
  color: hsl(0, 0%, 50%);
  font-weight: 300;
  margin-top: 4px;
}

.task-checkbox {
  position: absolute;
  inset: 0;
  appearance: none;
  cursor: pointer;
}
.task-checkbox:checked ~ .task-checkbox-fake {
  background-color: hsl(0, 0%, 90%);
}
.task-checkbox:checked ~ div .task-title {
  color: hsl(0, 0%, 50%);
  text-decoration: line-through;
}
.task-checkbox-fake {
  width: 16px;
  height: 16px;
  border: solid 1px hsl(0, 0%, 25%);
  border-radius: 4px;
  padding: 8px;
  margin: auto 0px auto auto;
  appearance: none;
}
</style>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  name: 'TaskItem',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  emits: ['toggleTask'],
  setup(props, { emit }) {
    const { task: taskProp } = toRefs(props)

    const toggleTask = (event: Event) => {
      const checked = (event.target! as HTMLInputElement).checked

      emit('toggleTask', taskProp.value.id, checked)
    }

    return {
      taskProp,
      toggleTask,
    }
  },
})
</script>
