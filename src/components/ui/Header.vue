<template>
  <div :class="$style.header">
    <div :class="$style.number">
      <span>{{ number }}</span>
    </div>
    <h1>
      <slot></slot>
    </h1>
  </div>
</template>

<script>
export default {
  name: "SectionHeader",
  props: {
    number: Number,
  },
};
</script>

<style module lang="scss">
@import "../../styles/colors.scss";

.header {
  height: 20px;
  display: flex;
  margin-bottom: 20px;
  align-items: center;

  h1 {
    font-size: 11px;
    text-transform: uppercase;
  }
}

.number {
  width: 20px;
  height: 20px;
  background: $fn-fg;
  border-radius: 100px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: $fn-bg;
    font-weight: bold;
  }
}
</style>
