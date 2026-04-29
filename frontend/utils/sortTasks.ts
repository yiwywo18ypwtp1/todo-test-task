import { Task } from "@/types/task";

export const sortTasksByStatus = (tasks: Task[], statusOrder: string) => {
    const order = {
        TODO: 0,
        IN_PROGRESS: 1,
        DONE: 2,
    };

    return [...tasks].sort((a, b) => {
        if (statusOrder === "asc") {
        return order[a.status] - order[b.status];
        } else {
        return order[b.status] - order[a.status];
        }
    });
};