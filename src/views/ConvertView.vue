<template>

  <ToolbarComponent style="margin-bottom: 50px;" /> 

  <main>
    <ul  class="currency-list">
      
      <!-- IDR -->
      <li class="currency-list-item">
        <div class="currency-card active">
          <CurrencyIcon class="currency-card-flag" :currency="'IDR'" />
          <div class="currency-card-title">
          <div class="currency-card-title-shorthand active">
            IDR
          </div>
          Indonesian Rupiah
          </div>


          <div class="currency-card-amount active">
            Rp 52.000
          </div>
        </div>
      </li>

      <div class="border">
        <span></span>
      </div>
      
      <!-- RUB -->
      <li class="currency-list-item">
        <div class="currency-card">
          <CurrencyIcon class="currency-card-flag" :currency="'RUB'" />
          <div class="currency-card-title">
            <div class="currency-card-title-shorthand">
              RUB
            </div>
          Russian ruble
          </div>


          <div class="currency-card-amount">
            Р 159
          </div>
        </div>
      </li>

    </ul>

  </main>
</template>

<script setup lang="ts">
import ToolbarComponent from '@/components/ToolbarComponent.vue'
import { reactive, onBeforeMount } from 'vue'
import CurrencyIcon from '@/components/CurrencyIcon.vue'

import { convertPageOpened, $selectedRates, getRatesFx } from '@/logic'
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

$accent-color:#0A23FF;
$secondary-color: #EBEDFF;

.currency-list {

  list-style: none;
  padding: 0;

  .border {
    width: 100vw;
    height: 0.5px;
    display: flex;
    justify-content: center;
    border-radius: 0.2px;

    span {
      background: #CCC;
      width: calc(100vw - 20px)
    }
  }

  &-item {
    &.active {
      background: $secondary-color;
    }
  }
}

.currency-card {
  display: flex;
  align-items: center;
  padding: 5px 15px;

  &.active {
    background: $secondary-color;
  }

  &-flag {
    margin-right: 10px;
  }

  &-title {
    
    &-shorthand {
      height: 12px;
      color: lightgray;
      font-size: 12px;
      
      &.active {
        color: $accent-color;
      }
    }
  }

  &-amount {
    position: absolute;
    right: 10px;
    background: $secondary-color;
    color: $accent-color;
    padding: 5px 10px;
    border-radius: 6px;

    &.active {
      background: $accent-color;
      color: white;
    }
  }
}
</style>
