'use client';

import { Task } from "@/types/task";
import { Trash2, Pencil } from "lucide-react";
import { deleteTask } from "@/api/tasks";

type TaskProps = {
    task: Task;
    openEdit: (task: Task) => void;
};

const TaskItem = ({ task, openEdit }: TaskProps) => {
    return (
        <li className="grid grid-cols-[50px_1fr_100px_120px_120px] items-center px-3 py-3 border-b hover:bg-gray-50 transition">
        <span className="opacity-50">{task.id}</span>

        <span className="text-lg truncate">{task.title}</span>

        <span className="text-xs text-gray-500">
            {task.status}
        </span>

        <span className="text-xs text-gray-500">
            {new Date(task.createdAt).toLocaleString()}
        </span>

        <div className="flex justify-end gap-2">
            <button
            className="border-2 border-gray-500 rounded-md p-1 bg-gray-500/10 hover:bg-gray-500/25 transition"
            onClick={() => openEdit(task)}
            >
            <Pencil className="text-gray-500" />
            </button>

            <button
            className="border-2 border-red-400 rounded-md p-1 bg-red-400/10 hover:bg-red-400/25 transition"
            onClick={async () => await deleteTask(task.id)}
            >
            <Trash2 className="text-red-400" />
            </button>
        </div>
        </li>
    );
};

export default TaskItem;