import React, { useState } from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import uuid from "uuid/v4";

const initialExpenses = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "car payment", amount: 400 },
  { id: uuid(), charge: "credit card bill", amount: 1200 }
];

// import useState()
// function returns [] with two values
// 1. the actual value of the state
// 2. function for updates/control
// default value

function App() {
  // **** state values ****
  // all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses);
  // single expense
  const [charge, setCharge] = useState(" ");
  // single amount
  const [amount, setAmount] = useState(" ");
  // **** functionality ****
  const handleCharge = e => {
    setCharge(e.target.value);
  };
  const handleAmount = e => {
    setAmount(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
  };
  return (
    <>
      <Alert></Alert>
      <h1>budget calculator</h1>
      <main className="App">
        {" "}
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
        ></ExpenseForm>
        <ExpenseList expenses={expenses}></ExpenseList>
      </main>
      <h1>
        total spending :{" "}
        <span className="total">
          ${" "}
          {expenses.reduce((acc, curr) => {
            return (acc += curr.amount);
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
