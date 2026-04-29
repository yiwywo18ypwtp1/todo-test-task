'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

import {login, signup} from "@/api/auth";

const AuthPage = () => {
    const router = useRouter();

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const doLogin = async (email: string, password: string) => {
        const result = await login({ email, password });

            if (result.data) {
                localStorage.setItem("token", result.data);
            }
        };

    const handleLogin = async () => {
        try {
            await doLogin(email, password);
            router.push("/");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleSignup = async () => {
        try {
            await signup({ email, password });
            await doLogin(email, password);
            router.push("/"); // ✅
        } catch (error) {
            console.error("Signup failed:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm flex flex-col gap-4">
            
                <h2 className="text-2xl font-semibold text-center">
                    {isLogin ? "Login" : "Signup"}
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/70"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/70"
                />

                <button
                    onClick={isLogin ? handleLogin : handleSignup}
                    className="bg-black text-white py-2 rounded-lg hover:bg-black/80 transition"
                >
                    {isLogin ? "Login" : "Signup"}
                </button>

                <p className="text-sm text-center text-gray-500">
                    {isLogin ? "No account?" : "Already have an account?"}

                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="ml-1 text-black underline"
                    >
                        {isLogin ? "Sign up" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default AuthPage;