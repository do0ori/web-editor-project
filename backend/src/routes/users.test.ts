import request from "supertest";
import { app } from "../app";
import { MOCK_USERS } from "../repositories/__mocks__/users.repository";

jest.mock("../repositories/users.repository", () => jest.requireActual("../repositories/__mocks__/users.repository"));

// 각 테스트 후에 MOCK_USERS 배열(DB의 역할을 대신함)을 비워서 테스트 간에 데이터가 서로 영향을 미치지 않도록 함
afterEach(() => {
    MOCK_USERS.splice(0, MOCK_USERS.length);
});

describe("POST /api/login", () => {
    it("올바른 email과 password로 요청을 보내면 access-token 쿠키가 설정되고 200 응답을 받는다.", async () => {
        MOCK_USERS.push({
            id: 1,
            email: "apple@example.com",
            encrypted_password: "mock_encrypted_apple123"
        });

        const response = await request(app)
            .post("/api/login")
            .send({
                email: "apple@example.com",
                password: "apple123"
            });

        expect(response.status).toBe(200);
        expect(response.headers["set-cookie"][0]).toContain("access-token=mock_jwt_");
    });

    it("잘못된 email과 password로 요청을 보내면 401 응답을 받는다.", async () => {
        MOCK_USERS.push({
            id: 1,
            email: "apple@example.com",
            encrypted_password: "mock_encrypted_apple123"
        });

        const response1 = await request(app)
            .post("/api/login")
            .send({
                email: "banana@example.com",
                password: "apple123"
            });

        expect(response1.status).toBe(401);

        const response2 = await request(app)
            .post("/api/login")
            .send({
                email: "apple@example.com",
                password: "banana123"
            });

        expect(response2.status).toBe(401);
    });
});

describe("POST /api/logout", () => {
    it("JWT 쿠키 설정 여부와 관계 없이 access-token 쿠키가 clear되고 200 응답을 받는다.", async () => {
        MOCK_USERS.push({
            id: 1,
            email: "apple@example.com",
            encrypted_password: "mock_encrypted_apple123"
        });

        const response1 = await request(app)
            .post("/api/logout")
            .set("Cookie", "access-token=mock_jwt_apple@example.com 1");

        expect(response1.status).toBe(200);
        expect(response1.headers["set-cookie"][0]).toContain("access-token=;");


        const response2 = await request(app)
            .post("/api/logout");

        expect(response2.status).toBe(200);
        expect(response2.headers["set-cookie"][0]).toContain("access-token=;");
    });
});

describe("GET /api/users/me", () => {
    it("올바른 JWT 쿠키가 설정되어 있으면 유저 정보(email)와 함께 200 응답을 받는다.", async () => {
        MOCK_USERS.push({
            id: 1,
            email: "apple@example.com",
            encrypted_password: "mock_encrypted_apple123"
        });

        const response = await request(app)
            .get("/api/users/me")
            .set("Cookie", "access-token=mock_jwt_apple@example.com 1");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ email: "apple@example.com" });
    });

    it("존재하지 않는 사용자에 대한 쿠키가 설정된 경우 401 응답을 받는다.", async () => {
        const response = await request(app)
            .get("/api/users/me")
            .set("Cookie", "access-token=mock_jwt_apple@example.com 1");

        expect(response.status).toBe(401);
    });

    it("JWT 쿠키가 없는 경우 401 응답을 받는다.", async () => {
        const response = await request(app)
            .get("/api/users/me");

        expect(response.status).toBe(401);
    });
});

describe("POST /api/users", () => {
    it("올바른 email과 password로 요청을 보내면 201 응답을 받는다.", async () => {
        const response = await request(app)
            .post("/api/users")
            .send({
                email: "apple@example.com",
                password: "apple123"
            });

        expect(response.status).toBe(201);
        expect(MOCK_USERS).toHaveLength(1);
    });

    it("이미 가입된 email로 요청을 보내면 409 응답을 받는다.", async () => {
        MOCK_USERS.push({
            id: 1,
            email: "apple@example.com",
            encrypted_password: "mock_encrypted_apple123"
        });

        const response = await request(app)
            .post("/api/users")
            .send({
                email: "apple@example.com",
                password: "apple123"
            });

        expect(response.status).toBe(409);
        expect(MOCK_USERS).toHaveLength(1);
    });
});