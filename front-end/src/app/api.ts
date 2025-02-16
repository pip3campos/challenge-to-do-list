'use server'

import axios, { AxiosResponse } from "axios"
import { ITask } from "../types/tasks"
import { IUser } from "../types/users"
import { cookies } from 'next/headers'

const baseUrl = 'http://localhost:8080';

export const signUp = async (userInfo: { email: string, password: string }): Promise<IUser> => {
    try {
        const res: AxiosResponse<IUser> = await axios.post<IUser>(`${baseUrl}/api/auth/signup`, userInfo);
        return res.data
    } catch (error) {
        console.error("Error creating account:", error);
        throw new Error("Failed to create account");
    }
}

export const signIn = async (userInfo: { email: string, password: string }): Promise<IUser> => {
    try {
        const res: AxiosResponse<IUser> = await axios.patch<IUser>(`${baseUrl}/api/auth/signin`, userInfo);
        cookies().set({
            name: 'token',
            value: res.data.response.token,
            httpOnly: true,
            secure: true,
            maxAge: 60*60*24,
            path: '/',
          });
        cookies().set({
            name: 'id',
            value: res.data.response.findUser._id,
            httpOnly: true,
            secure: true,
            maxAge: 60*60*24,
            path: '/',
          });
        return res.data;
    } catch (error) {
        console.error("Error signing in:", error);
        throw new Error("Failed to sign in");
    }
}

export const getAllTodos = async (): Promise<ITask[]> => {
    const token = cookies().get('token')?.value;
    const id = cookies().get('id')?.value;
    try {
        const res: AxiosResponse<ITask[]> = await axios.get<ITask[]>(`${baseUrl}/api/tasks/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Cache-Control': 'no-store'
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching todos:", error);
        throw new Error("Failed to fetch todos");
    }
}

export const addTask = async (TaskData: { title: string }): Promise<ITask> => {
    const token = cookies().get('token')?.value;
    const id = cookies().get('id')?.value;
    const taskInfo = {...TaskData, author_id: id};
    try {
        const res: AxiosResponse<ITask> = await axios.post<ITask>(`${baseUrl}/api/tasks`, taskInfo, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data
    } catch (error) {
        console.error("Error adding task:", error);
        throw new Error("Failed to add note");
    }
}

export const editTask = async (TaskData: { id: string, title: string }): Promise<ITask> => {
    const token = cookies().get('token')?.value;
    try {
        const res: AxiosResponse<ITask> = await axios.patch<ITask>(`${baseUrl}/api/tasks/${TaskData.id}`, TaskData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data
    } catch (error) {
        console.error("Error adding task:", error);
        throw new Error("Failed to add note");
    }
}

export const deleteTask = async (id: string): Promise<void> => {
    const token = cookies().get('token')?.value;
    try {
        await axios.delete<void>(`${baseUrl}/api/tasks/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("Error adding task:", error);
        throw new Error("Failed to add note");
    }
}