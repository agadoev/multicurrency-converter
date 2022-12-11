<template>
  <div class="wrapper" :class="{'active': searchOpened}">
    <div class="toolbar">
      <span class="title">
        Add currency
      </span>

      <span class="done" @click="() => closeSearchClicked()">
        Done
      </span>
    </div>
  
    <div class="input-wrapper">
      <i>
        <SearchIcon />
      </i>
      <input type="text" placeholder="Currency code" v-model="state.filter">
    </div>

    <ul class="search-list">
      <li v-for="currency in filteredCurrencies" @click="() => currencyToggled(currency)">
        <div class="currency-card">

          <input
            class="currency-card-checkbox"
            type="checkbox"
            :checked="selectedCurrencies.includes(currency)"> 

          <div class="currency-card-flag-wrapper">
            <CurrencyIcon class="currency-card-flag" :currency="currency" /> 
          </div>

          <div class="currency-card-title">
            <div class="currency-card-title-shorthand">
              {{ currency }}
            </div>
              {{ cc.code(currency)?.currency }}
          </div>

        </div> 
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import SearchIcon from '@/components/icons/Search.vue'
import CurrencyIcon from '@/components/icons/Currency.vue'
import {
  $currencies,
  $searchOpened,
  closeSearchClicked,
  $selectedCurrencies,
  currencyToggled
} from '@/logic'
import { useStore } from 'effector-vue/composition'
import getSymbolFromCurrency from 'currency-symbol-map'
import cc from 'currency-codes'
import { reactive, computed } from 'vue'

const state = reactive<{
  filter: string
}>({
  filter: ''
})

const allCurrencies = useStore($currencies)
const searchOpened = useStore($searchOpened)
const selectedCurrencies = useStore($selectedCurrencies)

const filteredCurrencies = computed(
  () => allCurrencies.value.filter(
    currency => currency.toLowerCase().startsWith(state.filter.toLowerCase()) ||
    state.filter == ''))
</script>

<style lang="scss" scoped>

.done {
    
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  position: absolute;
  right: 20px;

  color: #4169E1;

}

.toolbar {
  height: 75px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;


  .title {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 900;
    font-size: 16px;
    line-height: 19px;

    color: rgba(0, 0, 0, 0.7);
  }
}

.wrapper {
  width: 100vw;
  transition: 0.7s;
  background: white;
  position: fixed;
  bottom: 0;
  height: 0;
  
  &.active {
    height: 93vh;
  }
}

.input-wrapper {
  display: flex;
  border-radius: 5px;
  align-items: center;
  padding: 5px 10px;
  background: #F3F3F3;
  margin: 0 auto;
  width: 87vw;
  margin-bottom: 15px;

  i {
    margin-right: 5px;
    height: 20px;
    width: 20px;
  }

  input {
    border: 0;
    outline: none;
    background: inherit;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #949494;
  }
}


.search-list {
  height: 100%;
  padding: 0 10px;
  list-style: none;
  overflow-y: scroll;

  li {

  }
}

.currency-card {
  display: flex;
  align-items: center;
  gap: 17px;

  &-checkbox {

    width: 20px;
    height: 20px;

    &-wrapper {
      width: 33px;
      height: 21px;
    }
  }

  &-flag {

    width: 100%;
    height: 100%;

    &-wrapper {
      width: 33px;
      height: 21px;
    }
  }

  &-title  {

    &-shorthand {
      height: 12px;
      color: lightgray;
      font-size: 12px;
    }
  }
}


</style>
