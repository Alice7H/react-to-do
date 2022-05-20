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
  const placeholderInlt = intl.messages["inputPlaceholder"];
  const options = ["all", "completed", "uncompleted"];

  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const submittodoHandler = (e) => {
    e.preventDefault();
    if(inputText){
      setTodos([
        ...todos,
        { text: inputText, completed: false, id: Math.random() * 1000 },
      ]);
      setInputText("");
    }
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  return (
    <form>
      <label htmlFor="toDoInput">{placeholderInlt}</label>
      <input
        data-testid="toDoInput"
        id="toDoInput"
        type="text"
        placeholder={placeholderInlt}
        className="todo-list"
        onChange={inputTextHandler}
        value={inputText}
      />
      <button className="todo-button" type="submit" onClick={submittodoHandler} aria-label="Save">
        <i className="fas fa-plus-square"/>
      </button>
      <div className="select">
        <select name="todos" data-testid="selectFilter" className="filter-todo" onChange={statusHandler}>
          {options.map((option, index) => (
            <option key={index} value={option} data-testid="selectFilter-option">
              {itemsIntl[index]}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
