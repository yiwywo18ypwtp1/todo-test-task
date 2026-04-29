import { api } from "@/lib/api";
import { Task, CreateTask, UpdateTask, StatusFilter } from "@/types/task";


const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    };
};

export const getTasks = (status?: StatusFilter) => {
    return api.get(
        "/tasks",
        {
            params: status && status !== "ALL" ? { status } : {},
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
};

export const getTaskById = (id: number) => {
    return api.get<Task>(`/tasks/${id}`, getAuthHeaders());
};

export const createTask = (data: CreateTask) => {
    return api.post<Task>("/tasks", data, getAuthHeaders());
};

export const updateTask = (id: number, data: UpdateTask) => {
    return api.patch<Task>(`/tasks/${id}`, data, getAuthHeaders());
};

export const deleteTask = (id: number) => {
    return api.delete(`/tasks/${id}`, getAuthHeaders());
};