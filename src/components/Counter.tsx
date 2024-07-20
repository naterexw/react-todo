import { useTodosContext } from "../lib/hooks";

export default function Counter() {
  const { totalCompletedTodos, totalTodos } = useTodosContext();

  return (
    <p>
      <b>{String(totalCompletedTodos)}</b> / {String(totalTodos)} todos
      completed
    </p>
  );
}
