<template>
  <div class="paid-status">
    <img class="paid-status__success-icon" src="../images/paid-success.png">
    <p class="paid-status__pay-text">
      <span v-if="orderData.status == 3">支付处理中，请稍后查询！</span>
      <span v-if="orderData.status == 0 || orderData.status == 1">订单支付成功！</span>
    </p>
    <p v-if="orderData.payCredits && orderData.status != 3" class="paid-status__pay-result">
      您消费了<span class="paid-status__result-num">{{ orderData.payCredits }}</span>
      <span v-if="orderData.status == 0">食间豆</span>
      <span v-if="orderData.status == 1">元</span>
    </p>
    <p v-if="orderData.returnedCredits && orderData.returnedCredits > 0" class="paid-status__pay-result">
      您获得了<span class="paid-status__result-num">{{ orderData.returnedCredits }}</span>个食间豆
    </p>
  </div>
</template>
<script>
import { Icon } from 'vant';

export default {
  components: {
    [Icon.name]: Icon
  },

  props: {
    orderData: Object
  },

  computed: {

  }
};
</script>

<style lang="postcss">
body {
  background-color: #f7f7f7;
}

.paid-status {
  padding: 20px 0;
  text-align: center;

  &__success-icon {
    width: 111px;
    height: 115px;
  }

  &__pay-text {
    margin: 20px 0 6px;
    line-height: 28px;
    font-size: 20px;
    color: #333;
  }

  &__pay-result {
    line-height: 28px;
    font-size: 20px;
    color: #333;
  }

  &__result-num {
    color: #f00;
  }
}
</style>
