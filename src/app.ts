import express, { Application, Request, Response } from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { bookRoute } from './app/controllers/book.controller';
import { borrowRoute } from './app/controllers/borrow.controller';


const app: Application = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api/books", bookRoute)
app.use("/api/borrow", borrowRoute)

app.get('/', (req: Request, res: Response) => {
    res.send('Api is running');
});


export default app;