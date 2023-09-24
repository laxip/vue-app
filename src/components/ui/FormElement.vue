<template>
  <div :class="$style.element">
    <label>{{ label }}</label>

    <slot></slot>

    <div v-if="error" :class="$style.error">
      <div>
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormElement",
  props: {
    label: String,
    error: undefined,
  },
};
</script>

<style module lang="scss">
@import "../../styles/colors.scss";

.element {
  background: $fn-bg;
  height: 48px;
  border-bottom: 2px solid $fn-border;
  border-radius: 4px;
  margin-bottom: 16px;
  padding: 0 16px;
  padding-top: 8px;
  position: relative;

  label {
    display: block;
    font-size: 11px;
    font-weight: bold;
    color: $fn-label;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    box-sizing: border-box;
    border: none;
    height: 34px;
    outline: none;
    font-size: 14px;
  }
}

.error {
  position: absolute;
  bottom: 46px;
  left: 0;
  right: -3px;
  display: flex;
  justify-content: flex-end;

  > div {
    background: $color-red-light;
    padding: 5px 10px;
    border-radius: 5px;
    max-width: 90%;
    color: $color-red-dark;
    position: relative;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    font-size: 10px;

    &::after {
      content: "";
      display: block;
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;

      border-top: 10px solid $color-red-light;
      position: absolute;
      bottom: -8px;
      right: 0;
      transform: translateX(-50%);
    }
  }
}
</style>
