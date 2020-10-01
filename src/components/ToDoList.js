import React from 'react'
import Todo from './Todo';

export default function ToDoList({todos, setTodos, filteredTodos}) {
    // console.log(todos);

    return (
        <div className="todo-container">
            <ul className="todo-list">
                {filteredTodos.map( todo => (
                    <Todo todos={todos} setTodos={setTodos} todo={todo} key={todo.id} />
                ))}
            </ul>
        </div>
    );
};
