<template>
  <button :class="$style.button">
    <img src="./assets/cart.svg" alt="Cart icon" />
    <span><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: "FormSubmit",
};
</script>

<style module scoped lang="scss">
@import "../../styles/colors.scss";

.button {
  margin-top: 20px;
  height: 48px;
  border: none;
  border-bottom: 2px solid $color-green-dark;
  width: 100%;
  background: $color-green-normal;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: 800;
  color: white;
  cursor: pointer;
  transition: background-color 300ms;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 20px;
    margin-right: 8px;
  }

  &:hover {
    background: $color-green-light;
  }
}
</style>
