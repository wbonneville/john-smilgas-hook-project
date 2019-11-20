import React from "react";
import Item from "./ExpenseItem";

export const ExpenseList = ({ expenses }) => {
  return (
    <>
      <ul className="list">
        {expenses.map(expense => {
          return <Item key={expense.id} expense={expense}></Item>;
        })}
      </ul>
      {expenses.length > 0 && <button className="btn">clear expenses</button>}
    </>
  );
};

export default ExpenseList;
