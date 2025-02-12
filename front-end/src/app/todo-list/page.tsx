import ToDoList from "../../components/ToDoList";
import { getAllTodos } from "../api";
import AddForm from "@/components/AddForm";

export default async function Home() {
  const tasks = await getAllTodos();
  return (
      <div>
        <AddForm />
        <ToDoList tasks={tasks} />
      </div>
  )
}