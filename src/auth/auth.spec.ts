import request from "supertest";
import express from "express";
import AuthRoutes from "./auth";

let server: express.Express;
let router: express.Router;

beforeAll(async () => {
    server = express();
    router = express.Router();
    router.use("/", new AuthRoutes(server).configureRoutes())
})

describe('POST /register', () => {
    it('should return 200', () => {
        return request(server).post("/register").then(res => {
            expect(res.statusCode).toBe(200)
        })
    })

    it('should return a json object', () => {
        return request(server).post("/register").then(res => {
            expect(res.type).toBe('application/json')
        })
    })

    it('should return the correct response', () => {
        return request(server).post("/register").then(res => {
            expect(res.body.message).toBe("Registration success!")
        })
    })
})

describe('POST /login', () => {
    it('should return 200', () => {
        return request(server).post("/login").then(res => {
            expect(res.statusCode).toBe(200)
        })
    })

    it('should return a json object', () => {
        return request(server).post("/login").then(res => {
            expect(res.type).toBe('application/json')
        })
    })

    it('should return the correct response', () => {
        return request(server).post("/login").then(res => {
            expect(res.body.message).toBe("Logged In!")
        })
    })
})

describe('GET /logout', () => {
    it('should return 200', () => {
        return request(server).get("/logout").then(res => {
            expect(res.statusCode).toBe(200)
        })
    })

    it('should return a json object', () => {
        return request(server).get("/logout").then(res => {
            expect(res.type).toBe('application/json')
        })
    })

    it('should return the correct response', () => {
        return request(server).get("/logout").then(res => {
            expect(res.body.message).toBe("Logged Out!")
        })
    })
})
