'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Task, TaskStatus } from "@/types/task";
import { getTasks, createTask, updateTask } from "@/api/tasks";
import { TaskModal } from "@/components/TaskModal";
import TaskList from "@/components/TaskList";
import { User } from "@/types/user";
import { getMe } from "@/api/auth";


export default function Home() {
    const router = useRouter();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [statusFilter, setStatusFilter] = useState<"ALL" | TaskStatus>("ALL");
    
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const [userEmail, setUserEmail] = useState<string | null>(null);

    const openCreate = () => {
        setEditingTask(null);
        setIsOpen(true);
    };

    const openEdit = (task: Task) => {
        setEditingTask(task);
        setIsOpen(true);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.replace("/auth");
        } 
    }, [router]);

    useEffect(() => {
    const fetchMe = async () => {
        try {
        const res = await getMe();
        setUserEmail(res.data.user.email);
        } catch (e) {
        console.error(e);
        }
    };

    fetchMe();
    }, []);

    useEffect(() => {
        const fetchTasks = async () => {
        try {
            const res = await getTasks(statusFilter);
            setTasks(res.data);
        } catch (e) {
            console.error(e);
        }
    };

    fetchTasks();
    }, [statusFilter]);

    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <div className="min-h-screen w-1/2 border border-black/50 rounded-xl p-10">
                <div className="flex items-center justify-between">
                    <div className="flex gap-2 items-end">
                        <h1 className="text-xl">Your tasks</h1>

                        <div className="flex items-center gap-3">
                            <span className="text-md text-gray-500">
                                {userEmail}
                            </span>

                            <button
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    router.push("/auth");
                                }}
                                className="text-sm underline"
                                >
                                Logout
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <select
                            value={statusFilter}
                            onChange={(e) =>
                            setStatusFilter(e.target.value as "ALL" | TaskStatus)
                            }
                            className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
                        >
                            <option value="ALL">All</option>
                            <option value="TODO">TODO</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="DONE">DONE</option>
                        </select>

                        <button
                            className="bg-black text-white text-lg py-2 px-3 rounded-lg hover:bg-black/80 transition"
                            onClick={openCreate}
                            >
                            Create new
                        </button>
                    </div>
                </div>

                <TaskList tasks={tasks} openEdit={openEdit}/>
                
            </div>

            {isOpen && <TaskModal
                task={editingTask}
                onClose={() => setIsOpen(false)}
                onSubmit={async (data) => {
                    if (editingTask) {
                        const updated = await updateTask(editingTask.id, data);

                        setTasks(prev =>
                            prev.map(t =>
                            t.id === editingTask.id ? updated.data : t
                            )
                        );
                    } else {
                        const created = await createTask(data);

                        setTasks(prev => [...prev, created.data]);
                    }
                }
            }
            />}
        </div>
    );
}
