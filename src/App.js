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

  // alert
  const [alert, setAlert] = useState({ show: false });

  // **** functionality ****
  // handle charge
  const handleCharge = e => {
    setCharge(e.target.value);
  };
  // handle amount
  const handleAmount = e => {
    setAmount(e.target.value);
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  // handle submit
  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      const singleExpense = { id: uuid(), charge, amount };
      setExpenses([...expenses, singleExpense]);
      setCharge("");
      setAmount("");
      handleAlert({ type: "success", text: "item added" });
    } else {
      handleAlert({
        type: "danger",
        text: `charge can't be empty value and amount value has to be bigger than zero`
      });
    }
  };

  // clear all items
  const clearList = e => {
    setExpenses([]);
  };

  const handleDelete = id => {};

  const handleEdit = id => {
    // const singleExpense = { id: uuid(), charge, amount };
    // setExpenses([...expenses, ]);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text}></Alert>}

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
        <ExpenseList
          clearList={clearList}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          expenses={expenses}
        ></ExpenseList>
      </main>
      <h1>
        total spending :{" "}
        <span className="total">
          ${" "}
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
