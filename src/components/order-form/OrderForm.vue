<template>
  <div>
    <PersonalInformation v-if="step === 0" />
    <PaymentDetails v-if="step === 1" />
  </div>
</template>

<script>
import PersonalInformation from "./PersonalInformation.vue";
import PaymentDetails from "./PaymentDetails.vue";

export default {
  name: "OrderForm",
  computed: {
    step() {
      return this.$store.state.orderForm.step;
    },
  },
  components: {
    PersonalInformation,
    PaymentDetails,
  },
};
</script>
