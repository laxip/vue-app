<template>
  <div>
    <Header :number="2">Payment details</Header>

    <div :class="$style.container">
      <ValidationObserver v-slot="v">
        <form @submit.prevent="v.handleSubmit(onSubmit)">
          <ValidationProvider
            mode="eager"
            name="Credit Card number"
            :rules="{
              required: true,
              regex: /^[\d]{4}-[\d]{4}-[\d]{4}-[\d]{4}$/,
            }"
            v-slot="{ errors }"
          >
            <FormElement label="Credit Card number" :error="errors[0]">
              <MaskedInput
                v-model="creditCardNumber"
                mask="1111-1111-1111-1111"
                type="text"
                placeholder="NNNN-NNNN-NNNN-NNNN"
              />
            </FormElement>
          </ValidationProvider>

          <div class="form__double-row">
            <div>
              <ValidationProvider
                mode="eager"
                name="Security code"
                :rules="{
                  required: true,
                  regex: /^[\d]{3}$/,
                }"
                v-slot="{ errors }"
              >
                <FormElement label="Security code" :error="errors[0]">
                  <input
                    v-model="securityCode"
                    type="password"
                    placeholder="***"
                    maxlength="3"
                    pattern="[0-9]{3}"
                  />
                </FormElement>
              </ValidationProvider>
            </div>
            <div>
              <ValidationProvider
                mode="eager"
                name="Expiration date"
                :rules="{
                  required: true,
                  regex: /^[\d]{2}\/[\d]{2}$/,
                  expirationDate: true,
                }"
                v-slot="{ errors }"
              >
                <FormElement label="Expiration date" :error="errors[0]">
                  <MaskedInput
                    v-model="expirationDate"
                    mask="11/11"
                    type="text"
                    placeholder="MM/YY"
                  />
                </FormElement>
              </ValidationProvider>
            </div>
          </div>

          <Submit>Complete purchase</Submit>

          <div :class="$style.back">
            <button @click.prevent="back">← previous step</button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import MaskedInput from "vue-masked-input";
import { mapActions, mapMutations } from "vuex";
import FormElement from "../ui/FormElement.vue";
import Header from "../ui/Header.vue";
import Submit from "../ui/Submit.vue";
import getData from "@/utils/getData";

extend("expirationDate", (value) => {
  const parts = value.split("/");

  const month = parseInt(parts[0]);
  const year = parseInt(parts[1]);

  // it is example only
  if (month >= 1 && month <= 12 && year >= 23 && year < 34) {
    return true;
  }

  return "Invalid date";
});

export default {
  name: "PaymentDetails",
  data: function () {
    return {
      ...getData(this.$store.state.orderForm.paymentDetails),
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    MaskedInput,
    FormElement,
    Header,
    Submit,
  },
  methods: {
    back() {
      this.savePaymentDetails(this.$data);

      this.previousStep();
    },
    onSubmit() {
      this.savePaymentDetails(this.$data);

      this.showData();
    },
    ...mapActions({
      showData: "orderForm/showData",
    }),
    ...mapMutations({
      nextStep: "orderForm/nextStep",
      previousStep: "orderForm/previousStep",
      savePaymentDetails: "orderForm/savePaymentDetails",
    }),
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
};
</script>

<style module scoped lang="scss">
@import "../../styles/colors.scss";
@import "../../styles/vars.scss";

.container {
  margin-left: 30px;
}

.back {
  display: flex;
  justify-content: center;
  margin-top: 10px;

  button {
    border: none;
    background: none;
    color: $fn-label;
    cursor: pointer;
  }
}

@media screen and (max-width: $breakPointMiddle) {
  .container {
    margin-left: 0;
  }
}
</style>
