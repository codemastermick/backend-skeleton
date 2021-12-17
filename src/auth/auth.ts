import dotenv from "dotenv";
dotenv.config();
import express from "express";

const authSample = () => {
    const router = express.Router();

    router.route("/register").post((_req: express.Request, res: express.Response) => {
        res.contentType("application/json");
        res.send({ 'message': 'Registration success!' });
    });

    router.route("/login").get((_req: express.Request, res: express.Response) => {
        res.contentType("application/json");
        res.send({ 'message': 'Logged In!' });
    });

    router.route("/logout").get((_req: express.Request, res: express.Response) => {
        res.contentType("application/json");
        res.send({ 'message': 'Logged Out!' });
    });

    return router;
}

export default authSample;