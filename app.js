import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import "dotenv/config";

import { startDB } from "./src/config/database.js";

import { userRouter } from "./src/routes/user.routes.js"
import { profileRouter } from "./src/routes/profile.routes.js"
import { tagRouter } from "./src/routes/tag.routes.js"
import { postRouter } from "./src/routes/post.routes.js"

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use('/api/tags', tagRouter);
app.use('/api/users', userRouter);
app.use('/api/profiles', profileRouter);
app.use('/api/posts', postRouter);

app.listen(PORT, async () => {
    await startDB();
    console.log(`Servidor funcionando, en el puerto ${PORT}`);
});