import { api } from "@/lib/api";
import { AuthUser } from "@/types/user";

export const login = async (data: AuthUser) => {
    return api.post("/auth/login", data);
}

export const signup = async (data: AuthUser) => {
    return api.post("/auth/signup", data);
}

export const getMe = () => {
    return api.get("/auth/me", {
        headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};