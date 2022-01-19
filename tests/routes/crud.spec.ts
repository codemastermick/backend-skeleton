import request from "supertest";
import CrudRoutes from "../../src/routes/crud";
import express from "express";
import { StatusCodes } from "http-status-codes";

let server: express.Express;
let router: express.Router;

beforeAll(async () => {
    server = express();
    router = express.Router();
    router.use("/", new CrudRoutes(server).configureRoutes());
})

describe('POST /crud', () => {
    it('should return the correct response', () => {
        const payload = {
            "uid": "test",
            "displayName": "Test User",
            "password": "secret",
            "email": "demo@fakemail.net",
            "avatarUrl": ""
        }
        return request(server).post("/crud").send(payload).then(res => {
            expect(res.statusCode).toBe(StatusCodes.CREATED)
            expect(res.type).toBe('application/json')
            expect(res.body.message).toBe("Create success!")
        })
    })
})

describe('GET /crud', () => {
    it('should return the correct response', () => {
        return request(server).get("/crud").then(res => {
            expect(res.statusCode).toBe(200)
            expect(res.type).toBe('application/json')
            expect(res.body.message).toBe("Read success!")
        })
    })
})

describe('PUT /crud', () => {
    it('should return the correct response', () => {
        return request(server).put("/crud").then(res => {
            expect(res.statusCode).toBe(200)
            expect(res.type).toBe('application/json')
            expect(res.body.message).toBe("Update success!")
        })
    })
})

describe('DELETE /crud', () => {
    it('should return the correct response', () => {
        return request(server).delete("/crud").then(res => {
            expect(res.statusCode).toBe(200)
            expect(res.type).toBe('application/json')
            expect(res.body.message).toBe("Delete success!")
        })
    })
})