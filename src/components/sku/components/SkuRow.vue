<template>
  <div class="van-sku-row">
    <div class="van-sku-row__title">{{ skuRow.k }}</div>
    <div class="van-sku-row__items">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'van-sku-row',

  props: {
    skuRow: Object
  }
};
</script>
