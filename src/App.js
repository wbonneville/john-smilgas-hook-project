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
  const [expenses, setExpenses] = useState(initialExpenses);

  return (
    <>
      <Alert></Alert>
      <h1>budget calculator</h1>
      <main className="App">
        {" "}
        <ExpenseForm></ExpenseForm>
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
