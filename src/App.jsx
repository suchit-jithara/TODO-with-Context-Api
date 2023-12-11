import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItems";

import { TodoContext, TodoProvider } from "./context/TodoContext";
import { useEffect } from "react";

function App() {
  const [Todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    // here todo is a object which is recive as a argument.
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map(
        (prevTodo) =>
          prevTodo.id === id ? { ...prevTodo, todo: todo } : prevTodo // here we can write direct todo instide of todo: todo beacause property name and value name is same.
      )
    );
  };

  const deleteTodo = (id) => {
    // setTodos((prev) => (prev.map((preTodo)=> (preTodo.id === id? {}: preTodo ))));
    setTodos((prev) => prev.filter((preTodo) => preTodo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((preTodo) =>
        preTodo.id === id
          ? { ...preTodo, completed: !preTodo.completed }
          : preTodo
      )
    );
  };

  // localStorage Logic

  useEffect(() => {
    let data = JSON.parse(window.localStorage.getItem("Todos"));
    if (data && data.length) setTodos(data);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("Todos", JSON.stringify(Todos));
  }, [Todos]);

  return (
    <TodoProvider
      value={{ Todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        {/* <h1>Jay Bhagvan</h1> */}
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {Todos.map((todo) => (
              <div className="w-full" key={todo.id}>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
