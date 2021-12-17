import dotenv from "dotenv";
dotenv.config();
import express from "express";

const crudSample = () => {
    const router = express.Router();

    router.route("/item").post((_req: express.Request, res: express.Response) => {
        res.contentType("application/json");
        res.send({ 'message': 'Create success!' });
    });

    router.route("/item").get((_req: express.Request, res: express.Response) => {
        res.contentType("application/json");
        res.send({ 'message': 'Read success!' });
    });

    router.route("/item").put((_req: express.Request, res: express.Response) => {
        res.contentType("application/json");
        res.send({ 'message': 'Update success!' });
    });

    router.route("/item").delete((_req: express.Request, res: express.Response) => {
        res.contentType("application/json");
        res.send({ 'message': 'Delete success!' });
    });

    return router;
}

export default crudSample;