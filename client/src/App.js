import { BrowserRouter, Route } from "react-router-dom";
import { ShowTodoList } from "./components/showTodoList";
import { CreateTodo } from "./components/createTodo";
import "./App.scss";
import "./style.css";
//search
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
    // searh
    const [todos, setTodos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [pendingTodos, setPendingTodos] = useState(0);
    const [completedTodos, setCompletedTodos] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:8000/api/todo")
          .then(response => {
            setTodos(response.data);
            setPendingTodos(response.data.filter(todo => !todo.completed).length);
            setCompletedTodos(response.data.filter(todo => todo.completed).length);
          })
      }, []);
    
      const handleSearch = (e) => {
        setSearchTerm(e.target.value);
      }
      const filteredTodos = todos.filter(todo => {
        return todo.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
    
    
// searh end
    return (
        <div className="app-contents">
            <BrowserRouter>
                <Route exact path="/" component={ShowTodoList} />
                <Route path="/create-todo" component={CreateTodo} />
            </BrowserRouter>
    <div className="search_box">
            <input className="btn_size" type="text" onChange={handleSearch} />
            <button className="btn_size"> Search </button>
            <h3>Pending Todos: {pendingTodos}</h3>
            <h3>Completed Todos: {completedTodos}</h3>
      {filteredTodos.map(todo => 
        <div key={todo._id}>{todo.title}</div>
      )}
    </div>
        </div>
    );
}

export default App;
