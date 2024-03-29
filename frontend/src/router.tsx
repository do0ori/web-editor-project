import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { IndexPage } from "./pages/Index";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route index Component={IndexPage} />
    )
);