import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { IndexPage } from "./pages/Index";
import { LoginPage } from "./pages/Login";
import { JoinPage } from "./pages/Join";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route index Component={IndexPage} />
            <Route path="/login" Component={LoginPage} />
            <Route path="/join" Component={JoinPage} />
        </>
    )
);