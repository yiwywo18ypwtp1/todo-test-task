import { prisma } from "../db";

import { checkPass, hashPass } from "../utils/hashPass";
import { User } from "../types/user";
import { generate_token } from "../middlewares/JWTAuth";


export const signup = async ({ email, password }: User) => {
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        const err = new Error('User already exists') as any;
        err.status = 409;
        throw err;
    }

    const hashedPassword = await hashPass(password);

    const user = await prisma.user.create({
        data: {
            email: email,
            password: hashedPassword,
        },
    });

    return {
        "created_user": {
            "id": user.id,
            "email": user.email,
        },
    }
}

export const login = async ({ email, password }: User) => {
    const existUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    })

    if (!existUser) {
        const err = new Error("No User with this email exists") as any;
        err.status = 404;
        throw err;
    }

    await checkPass(password, existUser.password);

    return await generate_token({ id: existUser.id, email: existUser.email, password: existUser.password });
}

export const getMe = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            createdAt: true,
        },
    });

    if (!user) {
        const err = new Error("User not found") as any;
        err.status = 404;
        throw err;
    }

    return user;
};