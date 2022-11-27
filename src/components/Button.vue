<template>
  <button
    @click="() => emit('click')"
    :disabled="props.disabled">
      <slot />
  </button>
</template>

<script setup lang="ts">

const props = defineProps<{
  disabled: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped lang="scss">

button {
  color: white;
  border: none;
  background-color: #6666CC;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  
  &:disabled {
    background-color: #aeaeae;
    cursor: auto;
  }
}
  
</style>
