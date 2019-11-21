import React from "react";
import Item from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

export const ExpenseList = ({
  expenses,
  clearList,
  handleEdit,
  handleDelete
}) => {
  return (
    <>
      <ul className="list">
        {expenses.map(expense => {
          return (
            <Item
              key={expense.id}
              expense={expense}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            ></Item>
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button onClick={clearList} className="btn">
          clear expenses
          <MdDelete className="btn-icon"></MdDelete>
        </button>
      )}
    </>
  );
};

export default ExpenseList;
