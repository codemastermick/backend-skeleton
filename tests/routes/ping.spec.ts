import dotenv from 'dotenv';
dotenv.config();
import Server from '../../src/server'
import supertest, { SuperTest, Test } from "supertest";
import { STATUS_CODES } from 'http';
import { StatusCodes } from 'http-status-codes';

let request: SuperTest<Test>;

beforeAll(async () => {
    request = supertest(new Server().app);
})

describe('GET /ping', () => {

    it('should return the correct response', done => {
        request.get("/ping").then(res => {
            expect(res.statusCode).toBe(StatusCodes.OK);
            expect(res.type).toBe('application/json');
            expect(res.body.message).toBe("pong");
            done();
        })
    })
})