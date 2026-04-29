import { TasksStatus } from "@prisma/client";

export type Task = {
    id: number;
    title: string;
    description?: string;
    status: TasksStatus;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateTask = {
    title: string;
    description?: string;
    status?: TasksStatus;
};

export type UpdateTask = Partial<{
    title: string;
    description?: string;
    status: TasksStatus;
}>;

export type TaskId = number;