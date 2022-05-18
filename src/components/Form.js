import React from "react";
import { useIntl } from "react-intl";

export default function Form({
  todos,
  inputText,
  setTodos,
  setInputText,
  setStatus,
}) {
  const intl = useIntl();
  const itemsIntl = intl.messages["selectValues"];
  const options = ["all", "completed", "uncompleted"];

  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const submittodoHandler = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      { text: inputText, completed: false, id: Math.random() * 1000 },
    ]);
    setInputText("");
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  return (
    <form>
      <input
        type="text"
        className="todo-list"
        onChange={inputTextHandler}
        value={inputText}
      />
      <button className="todo-button" type="submit" onClick={submittodoHandler}>
        <i className="fas fa-plus-square" aria-label="Save"></i>
      </button>
      <div className="select">
        <select name="todos" className="filter-todo" onChange={statusHandler}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {itemsIntl[index]}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
