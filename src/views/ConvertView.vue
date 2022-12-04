<template>
  <div class="page-wrapper">

    <ToolbarComponent style="margin-bottom: 50px;" /> 

    <main>
      <ul  class="currency-list">
        <!-- IDR -->
        <li class="currency-list-item">
          <div class="currency-card" :class="{'active': keyboardOpened}">
            <CurrencyIcon class="currency-card-flag" :currency="'IDR'" />
            <div class="currency-card-title" :class="{'hidden': keyboardOpened}">
              <div class="currency-card-title-shorthand">
                IDR
              </div>
              Indonesian Rupiah
            </div>


            <div :class="{'wide': keyboardOpened}" class="currency-card-amount" @click="() => openKeyboardClicked()">

              <span class="currency-card-amount-input" v-show="keyboardOpened">

                <span v-show="state.inputed == ''">
                  Введите сумму
                </span>

                <span v-show="state.inputed !== ''">
                  {{ state.inputed }}
                </span>
              </span>

              <span v-show="!keyboardOpened">
                Rp 52.000
              </span>

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

    <div class="slidable" :class="{'opened': keyboardOpened}">
      <div class="cancel">
          <span @click="() => closeKeyboardClicked()">
          Cancel
        </span>
      </div>

      <div class="keyboard">
        <div class="row">
          <button @click="state.inputed += 7">7</button>
          <button @click="state.inputed += 8">8</button>
          <button @click="state.inputed += 9">9</button>
        </div>
        <div class="row">
          <button @click="state.inputed += 4">4</button>
          <button @click="state.inputed += 5">5</button>
          <button @click="state.inputed += 6">6</button>
        </div>
        <div class="row">
          <button @click="state.inputed += 1">1</button>
          <button @click="state.inputed += 2">2</button>
          <button @click="state.inputed += 3">3</button>
        </div>
        <div class="row">
          <button @click="backspaceClicked">
            <BackSpaceIcon />
          </button>
          <button @click="state.inputed += 0">0</button>
          <button class="accent" @click="convertClicked">
            <ConvertIcon />
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import ToolbarComponent from '@/components/ToolbarComponent.vue'
import { reactive, onBeforeMount, ref } from 'vue'
import CurrencyIcon from '@/components/icons/Currency.vue'
import ConvertIcon from '@/components/icons/Convert.vue'
import BackSpaceIcon from '@/components/icons/BackSpace.vue'

import {
  convertPageOpened,
  $selectedRates,
  getRatesFx,
  $keyboardOpened,
  openKeyboardClicked,
  closeKeyboardClicked
} from '@/logic'
import { useStore } from 'effector-vue/composition';
import type { Currency } from '@/getRates';

onBeforeMount(convertPageOpened)

onBeforeMount(getRatesFx)

const rates = useStore($selectedRates)

const keyboardOpened = useStore($keyboardOpened)

const state = reactive<{
  eur: number,
  inputed: string
}>({
  eur: 1,
  inputed: ""
});

const backspaceClicked = () => {
  state.inputed = removeLast(state.inputed)
}

const removeLast = (str: string): string => {
  if (str === '')
    return str

  return str.substring(0, str.length - 1);
}

const convertClicked = () => {
    console.log("convertClicked")
}

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

.cancel {
  display: flex;
  justify-content: end;
  padding: 10px 25px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: #4169E1;
}

.slidable {
  width: 100vw;
  background: transparent;
  height: 0;
  bottom: 0;
  position: fixed;

  transition-duration: 0.7s;

  &.opened {
    height: 436px;
  }
}

.keyboard {

  .row {
    display: flex;
  }

  button {
    flex-grow: 1;
    width: 100px;
    height: 100px;
    font-family: 'Roboto';
    touch-action: manipulation;
    color: #132C77;
    background: #FFFFFF;
    border: none;
    font-style: normal;
    font-weight: 700;
    border: none;
    font-size: 30px;
    line-height: 35px;

    &.accent {
      background: #6787E7;
    }

    &:active{
      background: #C6D2F6;
    }
  }
}


$accent-color:#0A23FF;
$secondary-color: #EBEDFF;

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
      
      &.active {
        color: $accent-color;
      }
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
