<template>
  <div class="page-wrapper">

    <ToolbarComponent style="margin-bottom: 50px;" /> 

    <main>
      <ul  class="currency-list">
        <li class="currency-list-item">
          <CurrencyCard
            :amount="'1 000 000'"
            :currency="'IDR'" />
        </li>

        <div class="border">
          <span></span>
        </div>

        <li class="currency-list-item">
          <CurrencyCard
            :amount="'15 550'"
            :currency="'RUB'" />
        </li>

        <div class="border">
          <span></span>
        </div>
        
        <li class="currency-list-item">
          <CurrencyCard
            :amount="'249'"
            :currency="'USD'" />
        </li>
      </ul>
    </main>

    <Numpad />

  </div>
</template>

<script setup lang="ts">
import ToolbarComponent from '@/components/ToolbarComponent.vue'
import { reactive, onBeforeMount } from 'vue'
import CurrencyCard from '@/components/CurrencyCard.vue'
import Numpad from '@/components/Numpad.vue'

import {
  convertPageOpened,
  $selectedRates,
  getRatesFx,
} from '@/logic'
import { useStore } from 'effector-vue/composition';
import type { Currency } from '@/getRates';

onBeforeMount(convertPageOpened)

onBeforeMount(getRatesFx)

const rates = useStore($selectedRates)

const state = reactive<{
  eur: number,
}>({
  eur: 1,
});

const rateChanged = (event: Event, coef: number) => {
  const amount = Number((event.target as HTMLInputElement).value);
  state.eur = amount / coef;
}
</script>

<style scoped lang="scss">

.page-wrapper {
  overflow: hidden;
}

main {
  overflow: hidden;
}

.currency-list {

  list-style: none;
  padding: 0;

  .border {
    width: 100vw;
    height: 0.5px;
    display: flex;
    justify-content: end;
    border-radius: 0.2px;

    span {
      background: #CCC;
      width: calc(100vw - 50px)
    }
  }
}
</style>
