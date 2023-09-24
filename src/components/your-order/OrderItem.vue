<template>
  <li :class="[{ [$style.highlighted]: highlighted }, $style.item]">
    <div :class="$style.label">
      {{ label }}
    </div>
    <div :class="$style.value">
      <MoneyFormat
        :value="value"
        locale="en"
        currency-code="USD"
        :hide-subunits="highlighted"
      />
    </div>
  </li>
</template>

<script>
import MoneyFormat from "vue-money-format";

export default {
  name: "OrderItem",
  props: {
    label: String,
    value: Number,
    highlighted: Boolean,
  },
  components: {
    MoneyFormat,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped module lang="scss">
.item {
  display: flex;
  padding: 0;
  margin: 10px 0;
  justify-content: space-between;
}

.highlighted {
  .value {
    font-size: 20px;
    font-weight: bold;
  }

  .label {
    font-weight: bold;
  }
}
</style>
