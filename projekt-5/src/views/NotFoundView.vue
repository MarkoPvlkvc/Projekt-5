<template>
  <main>
    <h1>Route '{{ route.path }}' Not Found</h1>
    <p style="margin-top: 16px; font-size: 20px; color: hsl(0, 0%, 50%); font-weight: 300">
      Try
      <RouterLink to="/" style="color: hsl(0, 0%, 90%); font-weight: 400">Home</RouterLink> instead.
    </p>
  </main>
</template>

<style scoped>
main {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

<script lang="ts">
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()

    return {
      route,
    }
  },
}
</script>
