<template>
  <div class="page-wrapper">

    <ToolbarComponent style="margin-bottom: 50px;" /> 

    <main>
      <ul  class="currency-list">
        <li v-for="currency in currencies" class="currency-list-item">
          <CurrencyCard
            :amount="eur * safe(rates, currency)"
            :currency="currency" />
        </li>
      </ul>
    </main>

    <Numpad />

    <SearchView />
  </div>
</template>

<script setup lang="ts">
import ToolbarComponent from '@/components/ToolbarComponent.vue'
import { onBeforeMount } from 'vue'
import CurrencyCard from '@/components/CurrencyCard.vue'
import Numpad from '@/components/Numpad.vue'
import SearchView from '@/views/SearchView.vue'

import {
  convertPageOpened,
  getRatesFx,
  $selectedCurrencies,
  $rates,
  $totalAmountEur
} from '@/logic'
import { useStore } from 'effector-vue/composition';
import type { Currency } from '@/getRates';

const safe = (rates: Record<Currency, number> | {}, currency: Currency): number => {
  if (Object.keys(rates).length == 0) {
    return 1
  }

  //@ts-ignore
  return rates[currency];
}

onBeforeMount(convertPageOpened)

onBeforeMount(getRatesFx)

const rates = useStore($rates)
const currencies = useStore($selectedCurrencies)
const eur = useStore($totalAmountEur)
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

  &-item {
    margin-bottom: 15px;
  }

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
