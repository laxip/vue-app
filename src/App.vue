<template>
  <div :class="$style.container">
    <div>
      <OrderForm />
    </div>
    <div :class="$style.rightColumn">
      <YourOrder />
    </div>
  </div>
</template>

<script>
import OrderForm from "./components/order-form/OrderForm.vue";
import YourOrder from "./components/your-order/YourOrder.vue";

export default {
  name: "App",
  components: {
    OrderForm,
    YourOrder,
  },
};
</script>

<style module scoped lang="scss">
@import "./styles/vars.scss";

.container {
  display: grid;
  max-width: 880px;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 10px;
  margin: auto;
}

.rightColumn {
  margin-top: 40px;
}

@media screen and (max-width: $breakPointMiddle) {
  .container {
    display: flex;
    flex-direction: column-reverse;
  }

  .rightColumn {
    margin-top: 0;
    margin-bottom: 40px;
  }
}
</style>

<style lang="scss">
@import "./styles/reset.scss";
@import "./styles/global.scss";
</style>
