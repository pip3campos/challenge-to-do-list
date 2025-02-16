import { FormEventHandler, useState } from 'react'
import { ITask } from '../types/tasks'
import { useRouter } from 'next/navigation'
import { editTask } from '../app/api'
import EditForm from './EditForm'

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
        (<EditForm task={task} handleSubmitEditTask={handleSubmitEditTask} setOpenInputEdit={setOpenInputEdit} editTaskValue={editTaskValue} setEditTaskValue={setEditTaskValue} />) : 
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