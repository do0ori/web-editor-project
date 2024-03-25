import express from "express";
import "express-async-errors";
import cookieParser from 'cookie-parser';
import cors from "cors";
import { CORS_ALLOWED_ORIGIN } from "./settings";
import usersRouter from "./routes/users.route";
import notesRouter from "./routes/notes.route";
import healthcheckRouter from "./routes/healthcheck.route";
import errorHandler from "./middlewares/errorHandler.middleware";

const app = express();

app.use(
    cors({
        origin: CORS_ALLOWED_ORIGIN,
        credentials: true
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/", usersRouter);
app.use("/api/notes", notesRouter);
app.use("/api/healthcheck", healthcheckRouter);

app.use(errorHandler);

export { app };