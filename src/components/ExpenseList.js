import React from "react";
import Item from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

// destructuring...
export const ExpenseList = ({
  expenses,
  clearList,
  handleEdit,
  handleDelete
}) => {
  return (
    <>
      {/* map through the expenses and display each one as an Item */}
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
      {/* if there are any expenses... then render this button */}
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
