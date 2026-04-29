import { Request, Response } from "express";
import * as taskService from "../services/tasks.service"
import { TasksStatus } from "@prisma/client";

export const createTask = async (req: Request, res: Response) => {
    const { title, description, status } = req.body;
    const userId = (req as any).user.id;

    try {
        const result = await taskService.create({
            title,
            description,
            status: status as TasksStatus,
            userId
        });

        res.json(result);
    } catch (err: any) {
        res.status(err.status || 500).json({
            message: err.message,
        });
    }
};

export const readAllTasks = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { status } = req.query;

        const result = await taskService.findAll(
            userId,
            status as TasksStatus | undefined
        );

        res.json(result);
    } catch (err: any) {
        res.status(err.status || 500).json({
            message: err.message,
        });
    }
};

export const readOneTask = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const userId = (req as any).user.id; 

        const result = await taskService.findById(id, userId);
        res.json(result);
    } catch (err: any) {
        res.status(err.status || 500).json({
            message: err.message,
        });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const userId = (req as any).user.id;
        const data = req.body;

        const result = await taskService.update(id, userId, data);
        res.json(result);
    } catch (err: any) {
        res.status(err.status || 500).json({
            message: err.message,
        });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const userId = (req as any).user.id;

        const result = await taskService._delete(id, userId);
        res.json(result);
    } catch (err: any) {
        res.status(err.status || 500).json({
            message: err.message,
        });
    }
};