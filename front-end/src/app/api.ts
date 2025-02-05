import axios, { AxiosResponse } from "axios"
import { ITask } from "../types/tasks"

const baseUrl = 'http://localhost:8080'

export const getAllTodos = async (): Promise<ITask[]> => {
    try {
        const res: AxiosResponse<ITask[]> = await axios.get<ITask[]>(`${baseUrl}/api/notes`, {
            headers: {
                'Cache-Control': 'no-store'
            }
        });
        return res.data
    } catch (error) {
        console.error("Error fetching todos:", error);
        throw new Error("Failed to fetch todos");
    }
}

export const addTask = async (TaskData: { title: string }): Promise<ITask> => {
    try {
        const res: AxiosResponse<ITask> = await axios.post<ITask>(`${baseUrl}/api/notes`, TaskData);
        return res.data
    } catch (error) {
        console.error("Error adding task:", error);
        throw new Error("Failed to add note");
    }
}

export const editTask = async (TaskData: { id: string, title: string }): Promise<ITask> => {
    try {
        const res: AxiosResponse<ITask> = await axios.patch<ITask>(`${baseUrl}/api/notes/${TaskData.id}`, TaskData);
        return res.data
    } catch (error) {
        console.error("Error adding task:", error);
        throw new Error("Failed to add note");
    }
}

export const deleteTask = async (id: string): Promise<void> => {
    try {
        await axios.delete<void>(`${baseUrl}/api/notes/${id}`);
    } catch (error) {
        console.error("Error adding task:", error);
        throw new Error("Failed to add note");
    }
}