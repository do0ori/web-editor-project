import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithRouter } from "@/utils/test/renderWithRouter";
import JoinForm from "./JoinForm";

// useJoin의 join을 mock
const mockJoin = jest.fn();
jest.mock("@/hooks/useAuth", () => ({
    useJoin: () => ({
        join: mockJoin
    })
}));

// react-hook-form 모듈의 useForm을 사용하고 있으므로 onSubmit 시 호출되는 handleSubmit을 mock
jest.mock("react-hook-form", () => {
    const originalHookFormModule = jest.requireActual("react-hook-form");
    const originalUseForm = jest.requireActual("react-hook-form").useForm;

    return {
        ...originalHookFormModule,
        useForm: () => ({
            ...originalUseForm(),
            handleSubmit: (onSubmit: any) => onSubmit
        })
    };
});

describe("JoinForm", () => {
    test("잘 렌더링된다.", () => {
        renderWithRouter(<JoinForm />);

        expect(screen.getByLabelText("이메일", { selector: "input" })).toBeInTheDocument();
        expect(screen.getByLabelText("비밀번호", { selector: "input" })).toBeInTheDocument();
        expect(screen.getByLabelText("비밀번호 확인", { selector: "input" })).toBeInTheDocument();
        expect(screen.getByText("회원가입", { selector: "button" })).toBeInTheDocument();
        expect(screen.getByText("로그인하기", { selector: "a" })).toBeInTheDocument();
    });

    test("로그인하기 버튼을 누르면 로그인 URL로 이동한다.", () => {
        renderWithRouter(<JoinForm />);

        fireEvent.click(screen.getByText("로그인하기"));

        expect(window.location.pathname).toBe("/login");
    });

    test("회원정보를 입력하고 회원가입 버튼을 누르면 onSubmit 콜백이 호출된다.", () => {
        // react-hook-form 모듈을 모킹합니다.
        // const mockHandleSubmit = jest.fn();
        jest.mock("react-hook-form", () => ({
            useForm: () => ({
                handleSubmit: (onSubmit: any) => onSubmit
            })
        }));

        renderWithRouter(<JoinForm />);

        fireEvent.change(screen.getByLabelText("이메일"), { target: { value: "foo@example.com" } });
        fireEvent.change(screen.getByLabelText("비밀번호"), { target: { value: "1234" } });
        fireEvent.change(screen.getByLabelText("비밀번호 확인"), { target: { value: "1234" } });
        fireEvent.click(screen.getByText("회원가입", { selector: "button" }));

        expect(mockJoin).toHaveBeenCalled();
        // expect(mockJoin).toHaveBeenCalledWith({ email: "foo@example.com", password: "1234" });
    });

    // test("비밀번호 확인을 다르게 입력하면 경고 메시지가 노출되고 onSubmit 콜백이 호출되지 않는다.", async () => {
    //     renderWithRouter(<JoinForm />);

    //     fireEvent.change(screen.getByLabelText("이메일"), { target: { value: "foo@example.com" } });
    //     fireEvent.change(screen.getByLabelText("비밀번호"), { target: { value: "1234" } });
    //     fireEvent.change(screen.getByLabelText("비밀번호 확인"), { target: { value: "123456" } });
    //     fireEvent.click(screen.getByText("회원가입", { selector: "button" }));

    //     await waitFor(() => {
    //         expect(screen.getByText("비밀번호가 일치하지 않습니다.")).toBeInTheDocument();
    //     });

    //     expect(mockJoin).not.toBeCalled();
    // });
});