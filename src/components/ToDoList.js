import React from "react";
import Todo from "./Todo";
import { FormattedMessage } from 'react-intl';

export default function ToDoList({ todos, setTodos, filteredTodos }) {

  return (
    <div className="todo-container">
      <ul className="todo-list" data-testid="toDoList">
        { todos.length > 0  
          ? filteredTodos.map((todo) => (
            <Todo todos={todos} setTodos={setTodos} todo={todo} key={todo.id} />
          ))
          : <h3><FormattedMessage id="emptyList" /></h3>
        }
      </ul>
    </div>
  );
}
