import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

// HTML 요소들을 DOM 형태로 출력 (response body에 싣지 않고 테스트를 위한 DOM 구조 생성)
export function renderWithRouter(ui: React.ReactElement, { route = "/" } = {}) {
    window.history.pushState({}, "Test page", route);
    render(ui, { wrapper: BrowserRouter });
}