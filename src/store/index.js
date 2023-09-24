import Vue from "vue";
import Vuex from "vuex";
import countriesModule from "./countries";
import cartModule from "./cart";
import orderFormModule from "./orderForm";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    countries: countriesModule,
    cart: cartModule,
    orderForm: orderFormModule,
  },
});
