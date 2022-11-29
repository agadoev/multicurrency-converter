<template>
  <div
    @click="() => emit('click')"
    :class="{selected: props.selected}"
    class="card hoverable clickable">
    <CurrencyIcon :currency="currency" />
    {{ currency }}
  </div>
</template>


<script setup lang="ts">
import type { Currency } from '@/getRates';
import CurrencyIcon from './CurrencyIcon.vue';

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
