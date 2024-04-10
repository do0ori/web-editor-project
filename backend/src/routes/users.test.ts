import request from "supertest";
import { app } from "../app";
import { User, MOCK_USERS } from "../models/__mocks__/user";

// 실제 user repo 대신 mock user model 사용
jest.mock("../repositories/users.repository", () => jest.requireActual("../models/__mocks__/user"));

// 각 테스트 후에 MOCK_USERS 배열(DB의 역할을 대신함)을 비워서 테스트 간에 데이터가 서로 영향을 미치지 않도록 함
afterEach(() => {
    MOCK_USERS.splice(0, MOCK_USERS.length);
});

describe("GET /api/users/me", () => {
    it("올바른 JWT 쿠키가 설정되어있으면 유저 정보(email)와 함께 200 응답을 받는다.", async () => {
        MOCK_USERS.push(new User(1, "apple@example.com", "mock_encrypted_apple123"));

        const response = await request(app)
            .get("/api/users/me")
            .set("Cookie", "access-token=mock_jwt_apple@example.com");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ email: "apple@example.com" });
    });
});