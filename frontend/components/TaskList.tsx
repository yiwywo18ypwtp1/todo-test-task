'use client'

import { useState } from "react"

import { Task } from "@/types/task"
import TaskItem from "./TaskItem";
import { sortTasksByStatus } from "@/utils/sortTasks";

type ListProps = {
    tasks: Task[];
    openEdit: (task: Task) => void;
}

const TaskList = ({tasks, openEdit}: ListProps) => {
    const [statusOrder, setStatusOrder] = useState<"asc" | "desc">("asc");

    return (
        <ul className="w-full flex flex-col">
            <li className="grid grid-cols-[50px_1fr_100px_120px_120px] px-3 py-2 text-sm font-semibold border-b">
                <span>ID</span>
                <span>Title</span>

                <button
                    onClick={() =>
                        setStatusOrder(prev => (prev === "asc" ? "desc" : "asc"))
                    }
                        className="flex items-center gap-1 hover:underline"
                    >
                        Status

                    <span className="text-xs">
                        {statusOrder === "asc" ? "↑" : "↓"}
                    </span>
                </button>

                <span>Date</span>
                <span className="text-right">Actions</span>
            </li>

            {sortTasksByStatus(tasks, statusOrder).map((t: Task) => 
                <TaskItem key={t.id} task={t} openEdit={openEdit} />
            )}
        </ul>
    )
}

export default TaskList;