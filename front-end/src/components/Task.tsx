'use client'

import { MouseEvent, useState } from 'react'
import { ITask } from '../types/tasks'
import DeleteButton from './DeleteButton'
import EditButton from './EditButton'
import TaskTitle from './TaskTitle'
import DeleteConfirmation from './DeleteConfirmation'
import { deleteTask } from '../app/api'
import { useRouter } from 'next/navigation'

interface TaskProps {
    task: ITask
}
const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter();
    const [openInputEdit, setOpenInputEdit] = useState<boolean>(false)
    const [openInputDelete, setOpenInputDelete] = useState<boolean>(false)

    const handleDeleteTask = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await deleteTask(task._id);
            console.log('Task deleted successfully');
            setOpenInputEdit(false);
            setOpenInputDelete(false);
            router.refresh();
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    }
    
    return (
        <li key={task._id} className="flex justify-between gap-x-6 py-5">
            {(openInputDelete) ? (<DeleteConfirmation handleDeleteTask={handleDeleteTask} setOpenInputDelete={setOpenInputDelete} />) :
            (<TaskTitle task={task} openInputEdit={openInputEdit} setOpenInputEdit={setOpenInputEdit} />)}
            <div className="hidden shrink-0 sm:flex sm:items-end">
                <EditButton openInputEdit={openInputEdit} setOpenInputEdit={setOpenInputEdit} />
                <DeleteButton openInputDelete={openInputDelete} setOpenInputDelete={setOpenInputDelete} />
            </div>
        </li>
    )
}

export default Task