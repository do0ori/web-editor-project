import request from "supertest";
import { app } from "../app";
import { MOCK_USERS } from "../repositories/__mocks__/users.repository";
import { MOCK_NOTES } from "../repositories/__mocks__/notes.repository";
import { authorizeNote } from "../middlewares/authorization.middleware";
import { Request, Response } from "express";
import { JWTUserPayload } from "../services/users.service";
import { NoteForbiddenError, NoteNotFoundError } from "../errors/userFacing.error";
import Note from "../models/note.model";

jest.mock("../repositories/users.repository", () => jest.requireActual("../repositories/__mocks__/users.repository"));
jest.mock("../repositories/notes.repository", () => jest.requireActual("../repositories/__mocks__/notes.repository"));

const CREATE_NOTE_REQ_BODY = { title: "test title", content: "test content" };
const UPDATE_NOTE_REQ_BODY = { title: "modify title", content: "modify content" };

MOCK_USERS.push({
    id: 1,
    email: "apple@example.com",
    encrypted_password: "mock_encrypted_apple123"
});

// 각 테스트 후에 MOCK_NOTES 배열(DB의 역할을 대신함)을 비워서 테스트 간에 데이터가 서로 영향을 미치지 않도록 함
afterEach(() => {
    MOCK_NOTES.splice(0, MOCK_NOTES.length);
});

describe("GET /api/notes", () => {
    it("노트 목록과 200 응답을 받는다.", async () => {
        MOCK_NOTES.push({
            id: 1,
            title: "title1",
            content: "content1",
            user_id: 1,
            created_at: (new Date()).toDateString(),
            updated_at: (new Date()).toDateString()
        });

        const response = await request(app)
            .get("/api/notes")
            .set("Cookie", "access-token=mock_jwt_apple@example.com 1");

        expect(response.status).toBe(200);
        expect(response.body[0]).toEqual(MOCK_NOTES[0]);
    });

    it("소유한 노트가 없으면 빈 배열과 200 응답을 받는다.", async () => {
        const response = await request(app)
            .get("/api/notes")
            .set("Cookie", "access-token=mock_jwt_apple@example.com 1");

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(0);
    });
});

describe("POST /api/notes", () => {
    it("생성된 노트 id와 201 응답을 받는다.", async () => {
        const response = await request(app)
            .post("/api/notes")
            .send(CREATE_NOTE_REQ_BODY)
            .set("Cookie", "access-token=mock_jwt_apple@example.com 1");

        expect(response.status).toBe(201);
        expect(response.body.id).toBe(MOCK_NOTES[0].id);
    });
});

describe("authorizeNote middleware", () => {
    interface MyRequest extends Request {
        user: JWTUserPayload;
        note: Note;
    }

    let req: Partial<MyRequest>;
    let res: Partial<Response>;
    let next: jest.Mock;

    beforeEach(() => {
        req = {
            params: { id: "1" },
            user: { id: 1, email: "apple@example.com" }
        };
        res = {};
        next = jest.fn();
    });

    it("올바른 요청이면 req.note에 note 정보를 담고 next 함수를 호출한다.", async () => {
        MOCK_NOTES.push({
            id: 1,
            title: "title1",
            content: "content1",
            user_id: 1,
            created_at: (new Date()).toDateString(),
            updated_at: (new Date()).toDateString()
        });

        await authorizeNote(req as Request, res as Response, next);

        expect(next).toHaveBeenCalled();
        expect(req.note).toBe(MOCK_NOTES[0]);
    });

    it("노트가 존재하지 않으면 404 에러를 던진다.", async () => {
        await expect(authorizeNote(req as Request, res as Response, next)).rejects.toThrow(NoteNotFoundError);

        expect(next).not.toHaveBeenCalled();
        expect(req.note).toBeUndefined();
    });

    it("노트가 존재하지만 사용자의 소유가 아니면 403 에러를 던진다.", async () => {
        MOCK_NOTES.push({
            id: 1,
            title: "title1",
            content: "content1",
            user_id: 2,
            created_at: (new Date()).toDateString(),
            updated_at: (new Date()).toDateString()
        });

        await expect(authorizeNote(req as Request, res as Response, next)).rejects.toThrow(NoteForbiddenError);

        expect(next).not.toHaveBeenCalled();
        expect(req.note).toBeUndefined();
    });
});

describe("GET /api/notes/:id", () => {
    it("노트 정보와 200 응답을 받는다.", async () => {
        MOCK_NOTES.push({
            id: 1,
            title: "title1",
            content: "content1",
            user_id: 1,
            created_at: (new Date()).toDateString(),
            updated_at: (new Date()).toDateString()
        });

        const response = await request(app)
            .get("/api/notes/1")
            .set("Cookie", "access-token=mock_jwt_apple@example.com 1");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(MOCK_NOTES[0]);
    });
});

describe("PUT /api/notes/:id", () => {
    it("200 응답을 받는다.", async () => {
        MOCK_NOTES.push({
            id: 1,
            title: "title1",
            content: "content1",
            user_id: 1,
            created_at: (new Date()).toDateString(),
            updated_at: (new Date()).toDateString()
        });

        const response = await request(app)
            .put("/api/notes/1")
            .send(UPDATE_NOTE_REQ_BODY)
            .set("Cookie", "access-token=mock_jwt_apple@example.com 1");

        expect(response.status).toBe(200);
        expect(MOCK_NOTES[0].title).toBe(UPDATE_NOTE_REQ_BODY.title);
        expect(MOCK_NOTES[0].content).toBe(UPDATE_NOTE_REQ_BODY.content);
    });
});

describe("DELETE /api/notes/:id", () => {
    it("200 응답을 받는다.", async () => {
        MOCK_NOTES.push({
            id: 1,
            title: "title1",
            content: "content1",
            user_id: 1,
            created_at: (new Date()).toDateString(),
            updated_at: (new Date()).toDateString()
        });

        const response = await request(app)
            .delete("/api/notes/1")
            .set("Cookie", "access-token=mock_jwt_apple@example.com 1");

        expect(response.status).toBe(200);
        expect(MOCK_NOTES).toHaveLength(0);
    });
});