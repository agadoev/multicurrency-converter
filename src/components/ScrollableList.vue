<template>
  <ul class="scrollable-list centered" :class="props.direction" :style="{ height: props.height }">
    <slot />
  </ul>
</template>

<script setup lang="ts">

const props = defineProps<{
  direction: 'horizontal' | 'vertical',
  height: string
}>()

</script>

<style lang="scss">

.scrollable-list {
  list-style: none;
  padding: 0;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }

  &.vertical {
    overflow-y: scroll;

    li {
      margin-bottom: 10px;    
    }
  }
  
  &.centered {
    text-align: center;
  }


  &.horizontal {
    display: flex;
    overflow-x: scroll;

    li {
      margin-right: 5px;  
    }
  }

}
  
</style>
