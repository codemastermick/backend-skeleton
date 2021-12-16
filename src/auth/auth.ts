import dotenv from "dotenv";
dotenv.config();
import express from "express";

const authRouter = () => {
    const router = express.Router();

    router.route("/register").get((req, res) => {
        res.contentType("application/json");
        res.send({ 'message': 'Registration success!' });
    });

    router.route("/login").get((req, res) => {
        res.contentType("application/json");
        res.send({ 'message': 'Logged In!' });
    });

    router.route("/logout").get((req, res) => {
        res.contentType("application/json");
        res.send({ 'message': 'Logged Out!' });
    });

    return router;
}

export default authRouter;