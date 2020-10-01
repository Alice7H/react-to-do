import React from 'react'

export default function Form({todos, inputText, setTodos, setInputText, setStatus}) {

    const inputTextHandler = (e) => {
        setInputText(e.target.value)
    }

    const submittodoHandler = (e) => {
        e.preventDefault();
        setTodos([
            ...todos, 
            {text: inputText, completed: false, id: Math.random() * 1000 }
        ]);
        setInputText('');
    }

    const statusHandler = (e) => {
        setStatus(e.target.value);
    }

    return(
        <form>
            <input type="text" className="todo-list" onChange={inputTextHandler} value={inputText}/>
            <button className="todo-button" type="submit" onClick={submittodoHandler}>
                <i className="fas fa-plus-square"></i>
            </button>
            <div className="select">
                <select name="todos" className="filter-todo" onChange={statusHandler}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
        </form>
    );
};

