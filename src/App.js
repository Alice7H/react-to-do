import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './components/Form';
import ToDoList from './components/ToDoList';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  // run once = when the app start
  useEffect(() => {
    const getLocalTodos = () => {
      if(localStorage.getItem('todos') === null ){
        localStorage.setItem('todos', JSON.stringify([]));
      }else{
        let todoLocal = JSON.parse(localStorage.getItem('todos'));
        setTodos(todoLocal);
      }
    }
    getLocalTodos();
  }, [])

  useEffect(() => {
    const filterHandler = () => {
      switch(status) {
        case 'completed':
          setFilteredTodos(todos.filter( todo => todo.completed === true))
          break;
        case 'uncompleted':
          setFilteredTodos(todos.filter( todo => todo.completed === false))
          break; 
        default: 
          setFilteredTodos(todos);
          break;
      }
    }
    filterHandler();
    
      // save to local
    const saveLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
    saveLocalTodos();
  }, [todos, status])

  return (
    <div className="App">
      <header>
        <h1> To Do List </h1>   
      </header>
      <Form 
        todos={todos} 
        inputText={inputText}
        setTodos={setTodos} 
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <ToDoList 
        todos={todos} 
        setTodos={setTodos} 
        filteredTodos={filteredTodos}
      />
    </div>
  );
}