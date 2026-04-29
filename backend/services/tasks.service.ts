import { prisma } from "../db";
import { TasksStatus } from "@prisma/client";
import { UserId } from "../types/user";

type TaskId = number;

type CreateTask = {
    title: string;
    description?: string;
    status?: TasksStatus;
    userId: number;
};

type UpdateTask = Partial<{
    title: string;
    description?: string;
    status: TasksStatus;
}>;

export const create = async ({
    title,
    description,
    status = "TODO",
    userId
}: CreateTask) => {
    return prisma.task.create({
        data: {
            title,
            description,
            status,
            userId
        }
    });
};

export const findAll = async (userId: number, status?: TasksStatus) => {
    return prisma.task.findMany({
        where: {
            userId,
            ...(status && { status })
        }
    });
};

export const findById = async (id: TaskId, userId: UserId) => {
    const task = await prisma.task.findFirst({
        where: { id, userId }
    });

    if (!task) {
        const err = new Error("Task not found") as any;
        err.status = 404;
        throw err;
    }

    return task;
};

export const update = async (id: TaskId, userId: UserId, data: UpdateTask) => {
    const existing = await prisma.task.findFirst({
        where: { id, userId }
    });

    if (!existing) {
        const err = new Error("Task not found") as any;
        err.status = 404;
        throw err;
    }

    return prisma.task.update({
        where: { id },
        data
    });
};

export const _delete = async (id: TaskId, userId: UserId) => {
    const existing = await prisma.task.findFirst({
        where: { id, userId }
    });

    if (!existing) {
        const err = new Error("Task not found") as any;
        err.status = 404;
        throw err;
    }

    await prisma.task.delete({
        where: { id }
    });

    return { message: "Task deleted" };
};