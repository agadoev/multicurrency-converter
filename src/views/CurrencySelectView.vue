<template>
  <div class="wrapper">
    <ul>
      <li
        v-for="currency in all"
        :class="{selected: selected.includes(currency)}"
        @click="() => currencySelected(currency)">
        {{ currency }}
      </li>
    </ul>

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
import { computed } from '@vue/reactivity'
import { useStore } from 'effector-vue/composition'
import { useRouter } from 'vue-router';

const all = useStore($currencies)
const selected = useStore($selectedCurrencies)

const confirmDisabled = computed(() => selected.value.length == 0)

const router = useRouter()

const handleConfirmClick = async () => {
  confirmClicked()
  await router.push('/convert')
}
</script>

<style scoped lang="scss">

.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

ul {

  list-style: none;

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
  
</style>
