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
    <ScrollableList :direction="'horizontal'" :height="'60px'">
      <li v-for="chip in selected">
        <Chip :text="chip" @action="() => currencySelected(chip)" />
      </li>
    </ScrollableList>
  </div>

  <div class="row mb10">

    <ScrollableList :direction="'vertical'" :height="'400px'">
      <li v-for="currency in allFiltered">
        <CurrencyCard
          :currency="currency"
          :selected="selected.includes(currency)"
          @click="() => currencySelected(currency)"/>
      </li>
    </ScrollableList>
  </div>

  <div class="row">
    <Button
      @click="handleConfirmClick"
      :disabled="confirmDisabled">
      confirm
    </Button>
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
import Chip from '@/components/Chip.vue'
import ScrollableList from '@/components/ScrollableList.vue'
import CurrencyCard from '@/components/CurrencyCard.vue'
import Button from '@/components/Button.vue'

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

.row {
  display: flex;
  justify-content: center;
}

</style>
