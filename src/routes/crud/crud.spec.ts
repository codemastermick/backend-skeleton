
import request from "supertest";
import CrudRoutes from "./crud";
import express from "express";

let server: express.Express;
let router: express.Router;

beforeAll(async () => {
    server = express();
    router = express.Router();
    router.use("/", new CrudRoutes(server).configureRoutes());
})

describe('POST /item', () => {
    it('should return 200', () => {
        return request(server).post("/item").then(res => {
            expect(res.statusCode).toBe(200)
        })
    })

    it('should return a json object', () => {
        return request(server).post("/item").then(res => {
            expect(res.type).toBe('application/json')
        })
    })

    it('should return the correct response', () => {
        return request(server).post("/item").then(res => {
            expect(res.body.message).toBe("Create success!")
        })
    })
})

describe('GET /item', () => {
    it('should return 200', () => {
        return request(server).get("/item").then(res => {
            expect(res.statusCode).toBe(200)
        })
    })

    it('should return a json object', () => {
        return request(server).get("/item").then(res => {
            expect(res.type).toBe('application/json')
        })
    })

    it('should return the correct response', () => {
        return request(server).get("/item").then(res => {
            expect(res.body.message).toBe("Read success!")
        })
    })
})

describe('PUT /item', () => {
    it('should return 200', () => {
        return request(server).put("/item").then(res => {
            expect(res.statusCode).toBe(200)
        })
    })

    it('should return a json object', () => {
        return request(server).put("/item").then(res => {
            expect(res.type).toBe('application/json')
        })
    })

    it('should return the correct response', () => {
        return request(server).put("/item").then(res => {
            expect(res.body.message).toBe("Update success!")
        })
    })
})

describe('DELETE /item', () => {
    it('should return 200', () => {
        return request(server).delete("/item").then(res => {
            expect(res.statusCode).toBe(200)
        })
    })

    it('should return a json object', () => {
        return request(server).delete("/item").then(res => {
            expect(res.type).toBe('application/json')
        })
    })

    it('should return the correct response', () => {
        return request(server).delete("/item").then(res => {
            expect(res.body.message).toBe("Delete success!")
        })
    })
})