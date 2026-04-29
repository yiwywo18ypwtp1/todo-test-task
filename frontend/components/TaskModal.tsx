'use client'

import { useState, useEffect } from "react";
import { Task, CreateTask, TaskStatus } from "@/types/task";

type Props = {
    task?: Task | null;
    onClose: () => void;
    onSubmit: (data: CreateTask) => void;
};

export const TaskModal = ({ task, onClose, onSubmit }: Props) => {
    const [title, setTitle] = useState<string>(task?.title || "");
    const [description, setDescription] = useState<string>(task?.description || "");
    const [status, setStatus] = useState<TaskStatus>(task?.status || "TODO");

    useEffect(() => {
        setTitle(task?.title || "");
        setStatus(task?.status || "TODO");
    }, [task]);

    const handleSubmit = () => {
        onSubmit({ title, status });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm flex flex-col gap-4">

            <h2 className="text-2xl font-semibold text-center">
                {task ? "Edit task" : "Create task"}
            </h2>

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/70"
            />

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border resize-y min-h-20 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/70"
            />

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/70"
            >
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">In progress</option>
                <option value="DONE">Done</option>
            </select>

            <button
                onClick={handleSubmit}
                className="bg-black text-white py-2 rounded-lg hover:bg-black/80 transition"
            >
                {task ? "Update" : "Create"}
            </button>

            <button
                onClick={onClose}
                className="text-sm text-center text-gray-500 hover:underline"
            >
                Cancel
            </button>

            </div>
        </div>
        );
};