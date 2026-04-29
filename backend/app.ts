import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.router";
import tasksRouter from "./routes/tasks.router";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({origin: "http://localhost:3000"}));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API working" });
});

app.use("/auth", authRouter)
app.use("/tasks", tasksRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});