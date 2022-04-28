import React, { useState } from "react";
const CurrencyData = ({ data, purchaseCurrency }) => {
  const [buttonDisable, setButtonDisable] = useState(true);
  const [amountOwn, setNewAmount] = useState(data?.value_localstorage?.amount_own || "");
  const todayDate = new Date().toISOString();
  const changeOfInput = (amount) => {
    let data = amount.target.value;

    if (data !== 0) {
      if (data !== "") {
        setNewAmount(data);
        setButtonDisable(false);
      } else {
        setButtonDisable(true);
      }
    } else {
      setButtonDisable(true);
    }
  };
  const purchase = () => {
    if (amountOwn !== "" || amountOwn !== 0) {
      purchaseCurrency({ name: data.short_name, value: amountOwn, valued_at: amountOwn * data.value, last_login: todayDate });
    }
    setButtonDisable(true);
  };

  return (
    <>
      <tr>
        <td>{data.name}</td>
        <td>{data.short_name}</td>
        <td>$ {data.value}</td>
        <td className={data.last_24 > 0 ? "positive" : "negative"}>{data.last_24}</td>
        <td>
          <input type='number' min={0} onChange={changeOfInput} value={amountOwn} />
          <button onClick={() => purchase()} disabled={buttonDisable}>
            Submit
          </button>
        </td>
        <td>{data?.value_localstorage?.value_own || ""}</td>
        <td>{data?.value_localstorage?.last_login || ""}</td>
        <td>{data?.value_localstorage?.gain_loss || ""}</td>
      </tr>
    </>
  );
};

export default CurrencyData;
