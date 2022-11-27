<template>
  <div
    @click="() => emit('click')"
    :class="{selected: props.selected}"
    class="card hoverable clickable">
    <div class="currency-flag" :class="{['currency-flag-' + props.currency.toLowerCase()]: true}"></div>
    {{ props.currency }}
  </div>
</template>


<script setup lang="ts">
import type { Currency } from '@/getRates';

const props = defineProps<{
  currency: Currency
  selected: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>


<style scoped lang="scss">
.card {
  width: 199px;
  padding: 10px 20px;
  border-radius: 23px;

  &.clickable {
    cursor: pointer;
  }

  &.selected {
    border: 1px solid #6666CC;
    color: #6666CC;
  }

  &.hoverable {
    &:hover {
      color: #6666CC;
    }
  }
}

</style>
