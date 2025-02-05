import ToDoList from "../components/ToDoList";
import { getAllTodos } from "./api";
import AddForm from "@/components/AddForm";

export default async function Home() {
  const tasks = await getAllTodos();
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">To Do List App</h1>
        <AddForm />
      </div>
      <ToDoList tasks={tasks} />
    </main>
  )
}
