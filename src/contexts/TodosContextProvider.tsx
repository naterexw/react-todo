import { useState } from "react";
import { Todo } from "../lib/interface";
import { createContext, ReactNode } from "react";
import { useEffect } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

interface TypeTodosContext {
  todos: Todo[];
  totalTodos: number;
  totalCompletedTodos: number;
  handleAddTodo: (todoText: string) => void;
  handleToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

export const TodosContext = createContext<TypeTodosContext | null>(null);

const getInitialTodos = () => {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    return JSON.parse(savedTodos);
  } else {
    return [];
  }
};

export default function TodosContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { isAuthenticated } = useKindeAuth();

  // state
  const [todos, setTodos] = useState<Todo[]>(getInitialTodos);

  // derived state
  const totalTodos = todos.length;
  const totalCompletedTodos = todos.filter((todo) => todo.isCompleted).length;

  // handlers
  const handleAddTodo = (todoText: string) => {
    if (todos.length >= 3 && !isAuthenticated) {
      alert("Login to add more than 3 todos");
      return;
    } else {
      setTodos([
        ...todos,
        { id: todos.length + 1, text: todoText, isCompleted: false },
      ]);
    }
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const onDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // side effects
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider
      value={{
        todos,
        totalTodos,
        totalCompletedTodos,
        handleAddTodo,
        handleToggleTodo,
        onDeleteTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}
