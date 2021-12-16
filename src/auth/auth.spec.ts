
import request from "supertest";
import { Express } from 'express-serve-static-core'
import authRouter from "./auth";
import express from "express";

let server: Express;

beforeAll(async () => {
    server = express();
    server.use("/", authRouter())
})

describe('GET /register', () => {
    it('should return 200', () => {
        return request(server).get("/register").then(res => {
            expect(res.statusCode).toBe(200)
        })
    })

    it('should return a json object', () => {
        return request(server).get("/register").then(res => {
            expect(res.type).toBe('application/json')
        })
    })

    it('should return the correct response', () => {
        return request(server).get("/register").then(res => {
            expect(res.body.message).toBe("Registration success!")
        })
    })
})

describe('GET /login', () => {
    it('should return 200', () => {
        return request(server).get("/login").then(res => {
            expect(res.statusCode).toBe(200)
        })
    })

    it('should return a json object', () => {
        return request(server).get("/login").then(res => {
            expect(res.type).toBe('application/json')
        })
    })

    it('should return the correct response', () => {
        return request(server).get("/login").then(res => {
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
