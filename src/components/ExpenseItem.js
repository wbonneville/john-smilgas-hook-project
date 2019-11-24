import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

// destructuring props
// get expense out of useState hook
// get click handlers
const ExpenseItem = ({ expense, handleEdit, handleDelete }) => {
  // destructuring props
  // get id, charge, and amount out of expense
  const { id, charge, amount } = expense;
  return (
    <li className="item">
      <div className="info">
        {/* display the props */}
        <span className="expense">{charge}</span>
        <span className="amount">${amount}</span>
      </div>
      <div>
        <button
          className="edit-btn"
          aria-label="edit button"
          // edit by selecting an id
          onClick={() => handleEdit(id)}
        >
          <MdEdit />
        </button>
        <button
          className="clear-btn"
          aria-label="delete button"
          // delete by selecting an id
          onClick={() => handleDelete(id)}
        >
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
