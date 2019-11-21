import React from "react";
import Item from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

export const ExpenseList = ({ expenses, handleClear }) => {
  return (
    <>
      <ul className="list">
        {expenses.map(expense => {
          return <Item key={expense.id} expense={expense}></Item>;
        })}
      </ul>
      {expenses.length > 0 && (
        <button onClick={handleClear} className="btn">
          clear expenses
          <MdDelete className="btn-icon"></MdDelete>
        </button>
      )}
    </>
  );
};

export default ExpenseList;
