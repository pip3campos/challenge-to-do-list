import React from "react"
import { ITask } from "../types/tasks"
import Task from "./Task"

interface ToDoListProps {
    tasks: ITask[]
}

const ToDoList: React.FC<ToDoListProps> = ({ tasks }) => {
    return (
        <ul role="list" className="divide-y divide-gray-100">
            {tasks.map((task, index) => (
                <Task key={index} task={task} />
            ))}
        </ul>
    )
}

export default ToDoList