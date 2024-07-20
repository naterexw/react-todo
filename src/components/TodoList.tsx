import DeleteButton from "./DeleteButton";
import { useTodosContext } from "../lib/hooks";

export default function TodoList() {
  const { todos, onDeleteTodo, handleToggleTodo } = useTodosContext();

  return (
    <ul>
      {todos.length === 0 && (
        <li className="h-full flex justify-center items-center font-semibold">
          Start by adding a todo
        </li>
      )}

      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex justify-between items-center px-8 h-[50px] text-[14px] cursor-pointer border-b border-black/[8%]"
          onClick={() => {
            handleToggleTodo(todo.id);
          }}
        >
          <span
            className={`${todo.isCompleted ? "line-through text-[#ccc]" : ""}`}
          >
            {todo.text}
          </span>
          <DeleteButton id={todo.id} onDeleteTodo={onDeleteTodo} />
        </li>
      ))}
    </ul>
  );
}
