<template>
  <main>
    <label for="">EUR</label>
    <input v-model="state.eur" type="text">

    <br>
    <br>

    <span v-for="[currency, rate] of Object.entries(rates)" v-bind:key="currency">
      <label for="">{{ currency }}</label>
      <input v-amount :value="state.eur * rate" type="number" @change="(ev) => rateChanged(ev, rate)">
    </span>

  </main>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount } from 'vue';
import type { Currency, Rate } from '@/getRates';

import { convertPageOpened, $selectedRates, getRatesFx } from '@/logic'
import { useStore } from 'effector-vue/composition';

onBeforeMount(convertPageOpened)

onBeforeMount(getRatesFx)

const rates = useStore($selectedRates)

const state = reactive<{
  eur: number,
  rates: Record<Currency, Rate> | {}
}>({
  eur: 1,
  rates: {}
});

// const rates = useStore<Record<Currency, Rate> | {}>($selectedRates)

// type CurrencyFn = (baseCurreny: number) => number

const rateChanged = (event: Event, coef: number) => {
  const amount = Number((event.target as HTMLInputElement).value);
  state.eur = amount / coef;
}
</script>

