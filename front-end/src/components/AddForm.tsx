'use client'

import { useRouter } from "next/navigation"
import { addTask } from "../app/api"
import { FormEventHandler, useState } from "react"

const AddForm = () => {
    const router = useRouter();
    const [newTaskValue, setNewTaskValue] = useState<string>('');

    const handleSubmitNewTask: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await addTask({
            title: newTaskValue
        })
        setNewTaskValue("")
        router.refresh();
    };

  return (
    <form onSubmit={handleSubmitNewTask}>
        <div className="mt-6 flex w-full gap-x-4">
            <input value={newTaskValue} onChange={e => setNewTaskValue(e.target.value)} type="text" placeholder="New task..." className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
            <button type="submit" className="flex-none w-1/6 rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" >Add</button>
        </div>
    </form>
  )
}

export default AddForm