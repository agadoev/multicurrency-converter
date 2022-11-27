<template>

  <RouterView />

</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { getRatesFx } from '@/logic'

onBeforeMount(getRatesFx)

</script>

