import { useContext, createContext } from "react";

const TodoContext = createContext({
  Todos: [
    {
      id: 1,
      todo: 'Jay Bhagvan',
      completed: false,
    }
  ],
  addTodo: (todo)=>{},
  updateTodo: (id, todo)=>{},
  deleteTodo: (id)=>{},
  toggleComplete: (id)=>{},
});

const TodoProvider = TodoContext.Provider;

const useTodo = () => {
  return useContext(TodoContext);
}

export { TodoContext, TodoProvider, useTodo };