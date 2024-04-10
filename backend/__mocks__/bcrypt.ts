import { jest } from "@jest/globals";

const bcrypt = {
    // 주어진 password 앞에 "mock_encrypted_"를 붙여서 반환하도록 모킹
    hash: jest.fn((password: string) => "mock_encrypted_" + password),

    // 주어진 token이 "mock_encrypted_"로 시작하지 않으면 에러를 던지고,
    // 주어진 token에서 "mock_encrypted_"를 제거한 문자열을 email로 반환하도록 모킹
    compare: jest.fn((password: string, encrypted: string) => {
        return ("mock_encrypted_" + password) === encrypted;
    }),
};

export default bcrypt;