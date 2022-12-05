<template>
  <div class="toolbar">

    <div class="accent-color edit">
      Edit
    </div>
    <h2 class="toolbar-title">
      converter.
    </h2>

    <div class="accent-color plus" @click="() => openSearchClicked()">
      +
    </div>
  </div>
</template>

<script lang="ts" setup>
import { openSearchClicked } from '@/logic'

</script>


<style scoped lang="scss">
.toolbar {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;

  &-title {
    font-weight: bold; 
  }
}

.accent-color {
  color: #4169E1;
}

.edit {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
}

.plus {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 200;
  font-size: 24px;
  line-height: 29px;
}
</style>
