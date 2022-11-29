<template>

  <ToolbarComponent style="margin-bottom: 50px;" /> 

  <main>
    <div class="currency-input-wrapper" v-for="[currency, rate] of Object.entries(rates)" v-bind:key="currency">
      <div class="currency-flag" :class="{['currency-flag-' + currency.toLowerCase()]: true}"></div>
      <label for="">{{ currency }}</label>
      <input
        :value="(state.eur * rate).toFixed(0)"
        type="number"
        @input="(ev) => rateChanged(ev, rate)">
    </div >

  </main>
</template>

<script setup lang="ts">
import ToolbarComponent from '@/components/ToolbarComponent.vue'
import { reactive, onBeforeMount } from 'vue';

import { convertPageOpened, $selectedRates, getRatesFx } from '@/logic'
import { useStore } from 'effector-vue/composition';

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
.currency-input-wrapper {

  .currency-flag {
    margin-right: 5px;
  }

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 20px;

  label {
    margin-right: 5px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      /* display: none; <- Crashes Chrome on hover */
      -webkit-appearance: none;
      margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type=number] {
      -moz-appearance:textfield; /* Firefox */
  }

  input {
    padding: 1px;
    border: 1px solid #dadce0;
    caret-color: #1a73e8;
    color: #70757a;
    border-radius: 6px;
    -webkit-appearance: none;

    background-color: #fff;
    margin: 0;
    overflow: hidden;
    text-align: left;
    line-height: 24px;
    -moz-appearance: textfield;
    padding: 1px 6px 1px 12px;
    font-size: 16px;
    font-family: arial,sans-serif;
    height: 40px;
    width: 150px;
    color: #4d5156;

    &:hover {
      border: 1px solid black;   
    }
  }

} 
</style>
