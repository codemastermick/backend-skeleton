import request from "supertest";
import express from "express";
import AuthRoutes from "../../src/routes/auth.router";

let server: express.Express;
let router: express.Router;

beforeAll(async () => {
    server = express();
    router = express.Router();
    router.use("/", new AuthRoutes(server).configureRoutes())
})

describe('POST /login', () => {
    it('should return the correct response', () => {
        return request(server).post("/login").then(res => {
            expect(res.statusCode).toBe(200)
            expect(res.type).toBe('application/json')
            expect(res.body.message).toBe("Logged In!")
        })
    })
})

describe('GET /logout', () => {
    it('should return the correct response', () => {
        return request(server).get("/logout").then(res => {
            expect(res.statusCode).toBe(200)
            expect(res.type).toBe('application/json')
            expect(res.body.message).toBe("Logged Out!")
        })
    })
})
