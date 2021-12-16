import dotenv from "dotenv";
dotenv.config();
import express from "express";

const crudRouter = () => {
    const router = express.Router();

    router.route("/create").get((req, res) => {
        res.contentType("application/json");
        res.send({ 'message': 'Create success!' });
    });

    router.route("/read").get((req, res) => {
        res.contentType("application/json");
        res.send({ 'message': 'Read success!' });
    });

    router.route("/update").get((req, res) => {
        res.contentType("application/json");
        res.send({ 'message': 'Update success!' });
    });

    router.route("/delete").get((req, res) => {
        res.contentType("application/json");
        res.send({ 'message': 'Delete success!' });
    });

    return router;
}

export default crudRouter;