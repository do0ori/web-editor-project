import { jest } from "@jest/globals";
import { JWTUserPayload } from "../src/services/users.service";

const jwt = {
    // 주어진 email 앞에 "mock_jwt_"를 붙이고 뒤에 id를 붙여 반환하도록 모킹
    sign: jest.fn((payload: JWTUserPayload) => {
        return `mock_jwt_${payload.email} ${payload.id}`;
    }),

    // 주어진 token이 "mock_jwt_"로 시작하지 않으면 에러를 던지고,
    // 주어진 token에서 "mock_jwt_"를 제거한 문자열을 email로 반환하도록 모킹
    verify: jest.fn((token: string) => {
        const [email, id] = token.split(' ');

        if (!email.startsWith("mock_jwt_")) {
            throw new Error("Invalid token");
        }

        return { id: parseInt(id), email: email.replace("mock_jwt_", "") };
    }),
};

export default jwt;