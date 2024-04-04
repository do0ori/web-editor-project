import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import IndexPage from "./pages/Index";
import LoginPage from "./pages/Login";
import JoinPage from "./pages/Join";
import ErrorPage from "./pages/Error";
import NoteIndexPage from "./pages/notes/Index";
import NoteDetailPage from "./pages/notes/Detail";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route index Component={IndexPage} />
            <Route path="/login" Component={LoginPage} />
            <Route path="/join" Component={JoinPage} />
            <Route path="/notes" Component={NoteIndexPage}>
                <Route path="/notes:noteId" Component={NoteDetailPage} />
            </Route>
            <Route path="/error" Component={ErrorPage} />
        </>
    )
);