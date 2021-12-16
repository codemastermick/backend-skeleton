import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();
const port = process.env.SERVER_PORT;

import authRouter from "./auth/auth";
import crudRouter from "./crud/crud";

app.get("/", (req, res) => {
    res.contentType("json");
    res.send({ 'message': 'Welcome to the tidy-todo API server' });
});

app.use("/auth", authRouter())
app.use("/crud", crudRouter())

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started at http://localhost:${port} -- Press ctrl+c to stop`);
});
