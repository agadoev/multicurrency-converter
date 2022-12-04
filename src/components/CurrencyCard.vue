<template>
  <div class="currency-card" :class="{'active': edited }">

    <CurrencyIcon class="currency-card-flag" :currency="props.currency" />

    <div class="currency-card-title" :class="{'hidden': edited }">
      <div class="currency-card-title-shorthand">
        {{ props.currency }}
      </div>
      {{ currencyInfo.currency }}
    </div>


    <div :class="{'wide': edited }" class="currency-card-amount" @click="onAmountClicked">

      <span class="currency-card-amount-input" v-show="edited">

        <span v-show="inputedValue === ''">
          Введите сумму
        </span>

        <span v-show="inputedValue !== ''">
          {{ inputedValue }}
        </span>
      </span>

      <span v-show="!edited">
        {{ getSymbolFromCurrency(props.currency) }} {{ props.amount }}
      </span>

    </div>
  </div>
</template>

<script lang="ts" setup>
import Currency from '@/getRates'
import CurrencyIcon from '@/components/icons/Currency.vue'
import getSymbolFromCurrency from 'currency-symbol-map'
import cc from 'currency-codes'
import {
  currencyAmountClicked,
  $editedCurrency,
  $inputedValue
} from '@/logic'
import { reactive, computed } from 'vue'
import { useStore } from 'effector-vue/composition'

const props = defineProps<{
  currency: Currency,
  amount: string,
}>()

const editedCurrency = useStore($editedCurrency)
const inputedValue = useStore($inputedValue)

const state = reactive<{
  inputed: string
  mode: 'default' | 'input',
}>({
  mode: 'default',
  inputed: ''
})

const edited = computed<boolean>(() => editedCurrency.value == props.currency)

const onAmountClicked = () => {
  currencyAmountClicked(props.currency)
}

const currencyInfo = cc.code(props.currency)
</script>

<style lang="scss">
.currency-card {
  display: flex;
  align-items: center;
  padding: 5px 15px;

  &.active {
    background: #6787E7;
  }

  &-flag {
    margin-right: 10px;
  }

  &-title {

    &.hidden {
      transform: scale(0)
    }
    
    &-shorthand {
      height: 12px;
      color: lightgray;
      font-size: 12px;
    }
  }

  &-amount {
    position: absolute;
    cursor: pointer;
    right: 10px;
    background: #F2F5FD;
    color: #214CCF;
    padding: 5px 10px;
    border-radius: 6px;
    transition: 1s;

    &-input {
      border: none;
      background: transparent;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: bold;
      font-size: 15px;
      line-height: 18px;
      /* identical to box height */


      color: #FFFFFF;
      outline: none;
    }

    &.wide {
      width: calc(100vw - 50px);
      border-radius: 0;
      color: white;
      font-family: 'Roboto';
      font-style: normal;
      font-weight: bold;
      font-size: 15px;
      line-height: 18px;
      background: #6787E7;

      right: 0;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}

</style>
