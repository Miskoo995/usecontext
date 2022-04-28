import React from "react";
import Table from "./components/Table";
import { Routes, Route } from "react-router-dom";
import CurrencyProivder from "./providersContext/currency.provider";
const App = () => {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <CurrencyProivder>
              <Table />
            </CurrencyProivder>
          }
        />
      </Routes>
    </>
  );
};

export default App;
