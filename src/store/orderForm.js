import getData from "@/utils/getData";

export default {
  namespaced: true,
  state: {
    step: 0,
    paymentDetails: {
      creditCardNumber: undefined,
      securityCode: undefined,
      expirationDate: undefined,
    },
    personalInformation: {
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      postalCode: undefined,
      phoneNumber: undefined,
      country: "PL",
    },
  },
  actions: {
    showData(context) {
      console.log(
        getData({
          ...context.state.paymentDetails,
          ...context.state.personalInformation,
        })
      );
    },
  },
  mutations: {
    nextStep(state) {
      state.step++;
    },
    previousStep(state) {
      state.step--;
    },
    savePersonalInformation(state, payload) {
      state.personalInformation = getData(payload);
    },
    savePaymentDetails(state, payload) {
      state.paymentDetails = getData(payload);
    },
  },
};
