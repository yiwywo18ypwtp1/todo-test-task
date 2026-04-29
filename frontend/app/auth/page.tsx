'use client'

import {login, signup} from "@/api/auth";
import { useState } from "react";

const AuthPage = () => {
    const isLogin = true;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await login({ email, password });
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleSignup = async () => {
        try {
            await signup({ email, password });
        } catch (error) {
            console.error("Signup failed:", error);
        }
    };

    return (<>
        <div>
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {isLogin ? <button onClick={handleLogin}>Login</button> : <button onClick={handleSignup}>Signup</button>}
        </div>
    </>);
}

export default AuthPage;