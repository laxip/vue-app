<template>
  <div>
    <Header :number="1">Personal information</Header>

    <div :class="$style.container">
      <ValidationObserver v-slot="v">
        <form @submit.prevent="v.handleSubmit(onSubmit)">
          <div class="form__double-row">
            <div>
              <ValidationProvider
                mode="eager"
                name="First name"
                rules="required"
                v-slot="{ errors }"
              >
                <FormElement label="First name" :error="errors[0]">
                  <input v-model="firstName" type="text" placeholder="Elon" />
                </FormElement>
              </ValidationProvider>
            </div>
            <div>
              <ValidationProvider
                mode="eager"
                name="Last name"
                rules="required"
                v-slot="{ errors }"
              >
                <FormElement label="Last name" :error="errors[0]">
                  <input v-model="lastName" type="text" placeholder="Musk" />
                </FormElement>
              </ValidationProvider>
            </div>
          </div>

          <ValidationProvider
            mode="eager"
            name="Email"
            rules="required|email"
            v-slot="{ errors }"
          >
            <FormElement label="Email" :error="errors[0]">
              <input
                v-model="email"
                type="email"
                placeholder="elon@spacex.com"
              />
            </FormElement>
          </ValidationProvider>

          <div class="form__double-row">
            <div>
              <ValidationProvider
                mode="eager"
                name="Country"
                rules="required"
                v-slot="{ errors }"
              >
                <FormElement label="Country" :error="errors[0]">
                  <VSelect
                    v-model="country"
                    label="Country"
                    :options="countries || []"
                    :reduce="(country) => country.ISO"
                  />
                </FormElement>
              </ValidationProvider>
            </div>
            <div>
              <ValidationProvider
                mode="eager"
                name="Postal code"
                :rules="{
                  required: Boolean(selectedCountryDetails.Regex),
                  regex: selectedCountryDetails.Regex,
                }"
                v-slot="{ errors }"
              >
                <FormElement label="Postal code" :error="errors[0]">
                  <input
                    v-model="postalCode"
                    type="text"
                    :placeholder="selectedCountryDetails.Format"
                  />
                </FormElement>
              </ValidationProvider>
            </div>
          </div>

          <ValidationProvider
            mode="eager"
            name="Phone number"
            :rules="{
              required: true,
              regex: /^\([\d]{3}\) [\d]{3}-[\d]{2}-[\d]{2}$/,
            }"
            v-slot="{ errors }"
          >
            <FormElement label="Phone number" :error="errors[0]">
              <MaskedInput
                v-model="phoneNumber"
                mask="(111) 111-11-11"
                type="text"
                placeholder="(NNN) NNN-NN-NN"
              />
            </FormElement>
          </ValidationProvider>

          <Submit>Next</Submit>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
import { required, email, regex } from "vee-validate/dist/rules";
import MaskedInput from "vue-masked-input";
import VSelect from "vue-select";
import { mapActions, mapMutations } from "vuex";
import FormElement from "../ui/FormElement.vue";
import Header from "../ui/Header.vue";
import Submit from "../ui/Submit.vue";
import getData from "@/utils/getData";

extend("email", email);
extend("regex", regex);
extend("required", required);

export default {
  name: "PersonalInformation",
  data: function () {
    return {
      ...getData(this.$store.state.orderForm.personalInformation),
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
    MaskedInput,
    VSelect,
    FormElement,
    Header,
    Submit,
  },
  methods: {
    onSubmit() {
      this.savePersonalInformation(this.$data);

      this.nextStep();
    },
    ...mapActions({
      load: "countries/load",
    }),
    ...mapMutations({
      nextStep: "orderForm/nextStep",
      savePersonalInformation: "orderForm/savePersonalInformation",
    }),
  },
  mounted() {
    this.load();

    window.scrollTo({ top: 0, behavior: "smooth" });
  },
  computed: {
    countries() {
      return this.$store.state.countries.data;
    },
    selectedCountryDetails() {
      const found = (this.countries || []).find((c) => c.ISO === this.country);

      return found || {};
    },
  },
};
</script>

<style module scoped lang="scss">
@import "../../styles/vars.scss";

.container {
  margin-left: 30px;
}

@media screen and (max-width: $breakPointMiddle) {
  .container {
    margin-left: 0;
  }
}
</style>
