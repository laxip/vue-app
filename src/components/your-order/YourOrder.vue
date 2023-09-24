<template>
  <div :class="$style.container">
    <div :class="$style.inner">
      <h1>Your order</h1>

      <ul>
        <OrderItem
          v-for="item in items"
          v-bind:key="item.id"
          v-bind:label="item.name"
          v-bind:value="item.price"
        ></OrderItem>
      </ul>

      <div :class="$style.separator"></div>

      <ul>
        <OrderItem label="Total purchases" v-bind:value="totalPurchases" />
        <OrderItem label="Estimated tax" v-bind:value="estimatedTax" />
      </ul>

      <div :class="$style.separator"></div>

      <ul>
        <OrderItem :highlighted="true" label="Total" v-bind:value="total" />
      </ul>
    </div>
  </div>
</template>

<script>
import OrderItem from "./OrderItem.vue";

export default {
  name: "YourOrder",
  computed: {
    items() {
      return this.$store.state.cart.items;
    },
    totalPurchases() {
      return this.items.reduce((sum, item) => sum + item.price, 0);
    },
    estimatedTax() {
      return this.totalPurchases * this.$store.state.cart.taxMultiplier;
    },
    total() {
      return this.totalPurchases + this.estimatedTax;
    },
  },
  components: {
    OrderItem,
  },
};
</script>

<style module scoped lang="scss">
h1 {
  text-transform: uppercase;
  padding: 0;
  margin: 0;
  font-size: 12px;
}

ul {
  padding: 0;
  margin: 20px 0;
}

.separator {
  border-top: 1px dashed #dadada;
}

.container {
  background: white;
  padding: 6px;
  border-radius: 4px;
  border-bottom: 2px solid #dadada;

  .inner {
    border: 1px dashed #dadada;
    padding: 14px;
    border-radius: 2px;
  }
}
</style>
