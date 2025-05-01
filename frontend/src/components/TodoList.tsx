import { useState, useEffect } from "react";
import supabase from "../utils/supabase";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getTodos() {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("todos").select("*");

        if (error) {
          throw error;
        }

        if (data) {
          setTodos(data);
        }
      } catch (error: any) {
        setError(error.message || "An error occurred while fetching todos");
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    }

    getTodos();
  }, []);

  if (loading) return <div>Loading todos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Todo List</h2>
      {todos.length === 0 ? (
        <p>No todos found. Create your first todo!</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo.id} className="p-2 border rounded">
              <span className={todo.completed ? "line-through" : ""}>
                {todo.title}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
