<template>

  <ToolbarComponent />

  <div class="row mb10">
    <span style="text-align: center;">
      Выберите валюты, в которых вы хотите считать свои деньги
    </span>
  </div>

  <div class="row mb10">
    <input type="search" @input="handleSearchInput">
  </div>

  <div class="row mb50">
    <ul class="chips">
      <li v-for="chip in selected">
        <CloseIcon @click="() => currencySelected(chip)" />   
        {{ chip }}
      </li> 
    </ul>  
  </div>

  <div class="wrapper mb10">
    <ul class="currencies">
      <li
        v-for="currency in allFiltered"
        :class="{selected: selected.includes(currency)}"
        @click="() => currencySelected(currency)">
        <div class="currency-flag" :class="{['currency-flag-' + currency.toLowerCase()]: true}"></div>
        {{ currency }}
      </li>
    </ul>
  </div>

  <div class="button-wrapper">
    <button
      @click="handleConfirmClick"
      :disabled="confirmDisabled">
      confirm
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  $currencies,
  $selectedCurrencies,
  currencySelected,
  confirmClicked
} from '@/logic'
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'effector-vue/composition'
import { useRouter } from 'vue-router'
import ToolbarComponent from '@/components/ToolbarComponent.vue'
import type { Currency } from '@/getRates'
import CloseIcon from '@/components/CloseIcon.vue'

const all = useStore($currencies)
const selected = useStore($selectedCurrencies)
const search = ref<string>("")

const getClassIconName = (currency: Currency) => `currency-flag-${currency.toLowerCase()}`

const confirmDisabled = computed(() => selected.value.length == 0)

const handleSearchInput = (event: Event) => {
  // @ts-ignore
  search.value = event.target.value
}

const allFiltered = computed<Currency[]>(
  () => all.value.filter(
    (currency) => currency.startsWith(search.value)))

const router = useRouter()

const handleConfirmClick = async () => {
  confirmClicked()
  await router.push('/convert')
}
</script>

<style scoped lang="scss">

.mb10 {
  margin-bottom: 20px;
}

.mb50 {
  margin-bottom: 50px;
}

ul.chips {
  list-style: none;
  display: flex;
  justify-content: center;
  overflow-x: scroll;
  width: 100%;
  padding: 0;

  li {
    display: flex;
    margin-right: 5px;

    border: 1px solid gray;
    color: white;
    background: gray;
    padding-top: 2px;
    padding-bottom: 2px;
    padding-right: 5px;
    border-radius: 10px;

    svg {
      cursor: pointer; 
    }
  }
}

.row {
  display: flex;
  justify-content: center;
}

.wrapper {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

ul.currencies {

  padding: 0;
  list-style: none;
  overflow-y: scroll;
  height: 400px;

  li {
    box-sizing: border-box;
    cursor: pointer;
    text-align: center;
    margin-bottom: 10px;
    width: 100px;
  }

  li:hover {
    color: #6666CC;
  }

  li.selected {
    border: 1px solid #6666CC;
  }
}

.button-wrapper {
  display: flex;
  justify-content: center;
}
  
</style>
