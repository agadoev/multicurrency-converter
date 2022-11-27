<template>
  <div class="chip">
    <CloseIcon @click="() => emit('action')" />   
    <span>
      {{ props.text }}
    </span>
  </div>
</template>

<script setup lang="ts">
import CloseIcon from '@/components/CloseIcon.vue'

const props = defineProps<{
  text: string
}>()

const emit = defineEmits<{
  (e: 'action'): void
}>()
  
</script>


<style scoped lang="scss">
.chip {
  display: flex;
  align-items: center;
  border: 1px solid gray;
  color: black;
  background: white;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-right: 5px;
  border-radius: 10px;

  svg {
    cursor: pointer ;
  }
}  
</style>
