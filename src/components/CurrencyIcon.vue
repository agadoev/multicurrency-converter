<template>
  <div
    style="border-radius: 6px;"
    class="currency-flag"
    :class="{['currency-flag-' + currency.toLowerCase()]: true}" />
</template>

<script lang="ts" setup>
import type { Currency } from '@/getRates'

const props = defineProps<{
  currency: Currency
}>()

</script>
