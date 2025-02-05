import { FormEventHandler, useState } from 'react'
import { ITask } from '../types/tasks'
import { useRouter } from 'next/navigation'
import { editTask } from '../app/api'

interface TaskProps {
    task: ITask,
    openInputEdit: boolean,
    setOpenInputEdit: (open: boolean) => void
}
const TaskTitle: React.FC<TaskProps> = ({ task, openInputEdit, setOpenInputEdit }) => {
    const router = useRouter();
    const [editTaskValue, setEditTaskValue] = useState<string>(task.title);

    const handleSubmitEditTask: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTask({
            id: task._id,
            title: editTaskValue
        })
        setOpenInputEdit(false)
        router.refresh();
    };
  return (
    <>
    {openInputEdit ? 
        (<form onSubmit={handleSubmitEditTask} className='w-full' >
            <input value={editTaskValue} onChange={e => setEditTaskValue(e.target.value)} type="text" placeholder={task.title} className="w-full flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
        </form>) : 
        (<div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-900">{task.title}</p>
            </div>
        </div>)
    }
    </>
)
}

export default TaskTitle