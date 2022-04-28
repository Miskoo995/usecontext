import propTypes from "./currency.types";
import checkLocalStorage from "../providersContext/utils/localStorage";

export const CURRENCIES_INITIAL_STATE = {
  currencies: [],
  loading: true,
  pagination: {
    start: 1,
    limit: 10,
  },
  columns: [
    { field: "name", headerName: "Name", width: 50 },
    { field: "short-name", headerName: "Short Name", width: 50 },
    { field: "value", headerName: "Value", width: 50 },
    { field: "last-24", headerName: "Last 24", width: 50 },
    { field: "amount-you-own", headerName: "Amount you own", width: 50 },
    { field: "value-you-own", headerName: "Value of your coin", width: 50 },
    { field: "last-login", headerName: "Last Login", width: 50 },
    { field: "gain-loss", headerName: "Gain/Loss since last login", width: 50 },
  ],
};

const currencyReducer = (state, action) => {
  const localStorage = checkLocalStorage();
  switch (action.type) {
    case propTypes.COLLECT_CURRENCIES:
      return {
        ...state,
        currencies:
          action.payload.map((cur) => {
            return {
              name: cur.name,
              short_name: cur.symbol,
              value: cur.quote.USD.price.toFixed(2),
              last_24: cur.quote.USD.percent_change_24h.toFixed(2),
              value_localstorage: localStorage
                ?.filter((data) => {
                  if (data.name === cur.symbol) return data;
                })
                .map((data) => {
                  return {
                    value_own: data.value * cur.quote.USD.price.toFixed(2),
                    amount_own: data.value,
                    last_login: data.last_login,
                    gain_loss: ((cur.quote.USD.price - data.valued_at) * data.value).toFixed(2) || "",
                  };
                })[0],
            };
          }) || [],
        loading: false,
      };
    case propTypes.PURCHASE_CURRENCY:
      return {
        ...state,
        currencies: action.payload,
        loading: false,
      };
    case propTypes.CURRENCIES_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case propTypes.CHANGE_PAGINATION:
      return {
        ...state,
        pagination: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default currencyReducer;
