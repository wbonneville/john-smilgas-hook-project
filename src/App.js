import React, { useState, useEffect } from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import uuid from "uuid/v4";

// const initialExpenses = [
//   { id: uuid(), charge: "rent", amount: 1600 },
//   { id: uuid(), charge: "car payment", amount: 400 },
//   { id: uuid(), charge: "credit card bill", amount: 1200 }
// ];

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

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
  // alert is initially set to false (closed)
  const [alert, setAlert] = useState({ show: false });
  // edit
  const [edit, setEdit] = useState(false);

  // edit item
  const [id, setId] = useState(0);
  // **** useEffect ****
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // **** FUNCTIONALITY ****

  // handle charge
  const handleCharge = e => {
    setCharge(e.target.value);
  };

  // handle amount
  const handleAmount = e => {
    setAmount(e.target.value);
  };

  // sets alert to true, thereby opening the alert
  // the alert closes after 3 seconds
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  // handle submit
  const handleSubmit = e => {
    // prevent refreshing
    e.preventDefault();
    // if the charge and the amount are not empty and actually contain values...
    if (charge !== "" && amount > 0) {
      if (edit) {
        // map through the items and return a new array of items minus the selected item
        let tempExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        // ...set the expenses
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "item edited" });
      } else {
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "item added" });
      }

      setCharge("");
      setAmount("");
    } else {
      handleAlert({
        type: "danger",
        text: `charge can't be empty value and amount value has to be bigger than zero`
      });
    }
  };

  // clear all items
  // set expenses array to a new, empty array
  const clearList = e => {
    setExpenses([]);
    // display the alert
    handleAlert({ type: "danger", text: "all items deleted" });
  };

  // filter through all the items
  // create a new array and inside it return all of the items but the selected item
  const handleDelete = id => {
    // if item.id is not equal to the passed (selected/clicked) id, shove it in the new array
    let tempExpenses = expenses.filter(item => item.id !== id);
    // set the actual state of the expenses = to the contents of the new array
    setExpenses(tempExpenses);
    // display the alert
    handleAlert({ type: "danger", text: "item deleted" });
  };

  // loop through the items in the array and only return the item that was clicked
  const handleEdit = id => {
    let expense = expenses.find(item => item.id === id);
    // edit the charge and amount
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    // conditional rendering
    // alert only shows if show alert.show is true
    <>
      {alert.show && <Alert type={alert.type} text={alert.text}></Alert>}

      <h1>budget calculator</h1>
      <main className="App">
        {" "}
        <ExpenseForm
          // pass down drops to expense form
          // charge prop = to the state of charge inside of the hook...
          // etc...
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
          //
        ></ExpenseForm>
        <ExpenseList
          // passing more props
          clearList={clearList}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          expenses={expenses}
        ></ExpenseList>
      </main>
      <h1>
        total spending :{" "}
        {/* use reduce to loop through the all of the amounts and add them up */}
        {/* accumulator is the total */}
        {/* current is the current item in the iteration */}
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
