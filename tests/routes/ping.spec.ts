import request from "supertest";
import express from "express";
import PingRoutes from "../../src/routes/ping.router";

let server: express.Express;
let router: express.Router;

beforeAll(async () => {
    server = express();
    router = express.Router();
    router.use("/", new PingRoutes(server).configureRoutes())
})

describe('GET /ping', () => {
    it('should return the correct response', () => {
        return request(server).get("/ping").then(res => {
            expect(res.statusCode).toBe(200)
            expect(res.type).toBe('application/json')
            expect(res.body.message).toBe("pong")
        })
    })
})