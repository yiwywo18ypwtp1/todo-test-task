export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type Task = {
    id: number;
    title: string;
    description?: string | null;
    status: TaskStatus;
    userId: number;
    createdAt: string;
    updatedAt: string;
};

export type CreateTask = {
    title: string;
    description?: string;
    status?: TaskStatus;
};

export type UpdateTask = Partial<CreateTask>;

export type StatusFilter = TaskStatus | "ALL";