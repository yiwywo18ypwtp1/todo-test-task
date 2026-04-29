import { prisma } from "../db";
import { TasksStatus } from "@prisma/client";
import { UserId } from "../types/user";
import { CreateTask, UpdateTask } from "../types/task";


type TaskId = number;

export const create = async (data: CreateTask, userId: number) => {
    return prisma.task.create({
        data: {
            title: data.title,
            description: data.description,
            status: data.status ?? "TODO",
            userId,
        },
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