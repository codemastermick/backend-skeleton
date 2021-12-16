
import request from "supertest";
import { Express } from 'express-serve-static-core'
import crudRouter from "./crud";
import express from "express";

let server: Express;

beforeAll(async () => {
    server = express();
    server.use("/", crudRouter())
})

describe('GET /create', () => {
    it('should return 200', () => {
        return request(server).get("/create").then(res => {
            expect(res.statusCode).toBe(200)
        })
    })

    it('should return a json object', () => {
        return request(server).get("/create").then(res => {
            expect(res.type).toBe('application/json')
        })
    })

    it('should return the correct response', () => {
        return request(server).get("/create").then(res => {
            expect(res.body.message).toBe("Create success!")
        })
    })
})

describe('GET /read', () => {
    it('should return 200', () => {
        return request(server).get("/read").then(res => {
            expect(res.statusCode).toBe(200)
        })
    })

    it('should return a json object', () => {
        return request(server).get("/read").then(res => {
            expect(res.type).toBe('application/json')
        })
    })

    it('should return the correct response', () => {
        return request(server).get("/read").then(res => {
            expect(res.body.message).toBe("Read success!")
        })
    })
})

describe('GET /update', () => {
    it('should return 200', () => {
        return request(server).get("/update").then(res => {
            expect(res.statusCode).toBe(200)
        })
    })

    it('should return a json object', () => {
        return request(server).get("/update").then(res => {
            expect(res.type).toBe('application/json')
        })
    })

    it('should return the correct response', () => {
        return request(server).get("/update").then(res => {
            expect(res.body.message).toBe("Update success!")
        })
    })
})

describe('GET /delete', () => {
    it('should return 200', () => {
        return request(server).get("/delete").then(res => {
            expect(res.statusCode).toBe(200)
        })
    })

    it('should return a json object', () => {
        return request(server).get("/delete").then(res => {
            expect(res.type).toBe('application/json')
        })
    })

    it('should return the correct response', () => {
        return request(server).get("/delete").then(res => {
            expect(res.body.message).toBe("Delete success!")
        })
    })
})