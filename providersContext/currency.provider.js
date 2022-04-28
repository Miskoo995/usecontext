import React, { createContext, useReducer } from "react";
import propTypes from "../state/currency.types";
import currencyReducer, { CURRENCIES_INITIAL_STATE } from "../state/currency.reducer";
import collectDisplayData from "./utils/collectCurrencyData";
import checkLocalStorage from "./utils/localStorage";
export const CurrencyContext = createContext({
  ...CURRENCIES_INITIAL_STATE,
});

const CurrencyProivder = ({ children }) => {
  const [store, dispatch] = useReducer(currencyReducer, CURRENCIES_INITIAL_STATE);
  let { currencies, pagination, columns, loading } = store;
  const todayDate = new Date().toISOString();

  //PURCHASE CURRENCY
  const purchaseCurrency = (data) => {
    const { name, value } = data;

    const index = store.currencies.findIndex((e) => e.short_name === name);
    const parameters = { value: parseFloat(value), last_login: todayDate, value_own: (value * store.currencies[index].value).toFixed(2) };
    checkLocalStorage({ ...parameters, name });
    store.currencies[index] = {
      ...store.currencies[index],
      value_localstorage: parameters,
    };
    dispatch({
      type: propTypes.PURCHASE_CURRENCY,
      payload: store.currencies,
    });
  };
  // COLLECT MAIN CURRENCY
  const collectCurrencies = async (reference) => {
    const { data, error } = await collectDisplayData({ start: pagination.start, limit: pagination.limit });
    dispatch({
      type: propTypes.CURRENCIES_LOADING,
      payload: true,
    });
    if (!error) {
      if (reference) {
        checkLocalStorage({ provider: { reference, currencies } });
      }
      dispatch({
        type: propTypes.COLLECT_CURRENCIES,
        payload: data.data.data,
      });
    }
  };
  //CHANGE PAGINATION
  const changePagination = (parameter) => {
    dispatch({
      type: propTypes.CURRENCIES_LOADING,
      payload: true,
    });
    // pagination = {
    //   start: parameter === 1 ? parameter : parameter * 10 + 1,
    //   limit: 10,
    // };

    dispatch({
      type: propTypes.CHANGE_PAGINATION,
      payload: {
        start: parameter === 1 ? parameter : parameter * 10 + 1,
        limit: 10,
      },
    });
    //    collectCurrencies();
  };
  return (
    <CurrencyContext.Provider value={{ currencies, collectCurrencies, purchaseCurrency, columns, loading, changePagination, pagination }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProivder;
