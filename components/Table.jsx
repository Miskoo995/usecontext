import TableCss from "./Table.css";
import React, { useEffect, useContext, useRef, useState } from "react";
import { CurrencyContext } from "../providersContext/currency.provider";
import useInterval from "../providersContext/utils/useInterval";
import TableItem from "./TableItem";
import animationLoading from "../img/loading.gif";

const Table = () => {
  const { currencies, collectCurrencies, purchaseCurrency, columns, loading, changePagination, pagination } = useContext(CurrencyContext);
  const reference = useRef();
  const [active, setActive] = useState(0);

  useEffect(() => {
    collectCurrencies();
  }, [pagination]);

  useInterval(() => {
    reference.current = new Date().toISOString();
    collectCurrencies(reference);
  }, 50000000);

  const pageNumbers = [...Array(5 + 1).keys()].slice(1);

  const changePage = (event, index) => {
    changePagination(event.target.value);
    setActive(index);
  };

  return loading ? (
    <img className='animationLoading' src={animationLoading} alt='loading' />
  ) : (
    <>
      <table>
        <thead>
          <tr>
            {columns.map((col) => {
              return (
                <td>
                  <b>{col.headerName}</b>
                </td>
              );
            })}
          </tr>
          {currencies.map((curency, key) => {
            return <TableItem data={curency} purchaseCurrency={purchaseCurrency} />;
          })}
        </thead>
      </table>
      <div id='app' className='container'>
        <ul className='page'>
          {pageNumbers.map((page, index) => {
            return (
              <li className={index === active ? "page__numbers active " : "page__numbers"} onClick={(e) => changePage(e, index)} value={page}>
                {page}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Table;
