import React from "react";

export default function Todo({ todos, setTodos, todo }) {
  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
  };

  const completeHandler = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="todo">
      <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
        {todo.text}
      </li>
      <button className="complete-btn" onClick={completeHandler}>
        <i className="fas fa-check" aria-label="Check" />
      </button>
      <button className="trash-btn" onClick={deleteHandler}>
        <i className="fas fa-trash" aria-label="Remove" />
      </button>
    </div>
  );
}
