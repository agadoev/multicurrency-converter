<template>
  <div class="slidable" :class="{'opened': keyboardOpened}">
    <div class="cancel">
        <span @click="() => closeKeyboardClicked()">
        Cancel
      </span>
    </div>

    <div class="keyboard">
      <div class="row">
        <button @click="() => keyboardButtonClicked('7')">7</button>
        <button @click="() => keyboardButtonClicked('8')">8</button>
        <button @click="() => keyboardButtonClicked('8')">9</button>
      </div>
      <div class="row">
        <button @click="() => keyboardButtonClicked('4')">4</button>
        <button @click="() => keyboardButtonClicked('5')">5</button>
        <button @click="() => keyboardButtonClicked('6')">6</button>
      </div>
      <div class="row">
        <button @click="() => keyboardButtonClicked('1')">1</button>
        <button @click="() => keyboardButtonClicked('2')">2</button>
        <button @click="() => keyboardButtonClicked('3')">3</button>
      </div>
      <div class="row">
        <button @click="() => backspaceClicked()">
          <BackSpaceIcon />
        </button>
        <button @click="() => keyboardButtonClicked('0')">0</button>
        <button class="accent">
          <ConvertIcon />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  closeKeyboardClicked,
  keyboardButtonClicked,
  $editedCurrency,
  backspaceClicked
} from '@/logic'
import { computed } from 'vue'
import ConvertIcon from '@/components/icons/Convert.vue'
import BackSpaceIcon from '@/components/icons/BackSpace.vue'
import { useStore } from 'effector-vue/composition'

const editedCurrency = useStore($editedCurrency)

const keyboardOpened = computed(() => editedCurrency.value !== null)
</script>

<style lang="scss">
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
  
</style>
