import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const bookRoute = express.Router();

// create book
bookRoute.post("/", async(req: Request, res: Response)=>{
    try {
        const bookdata = req.body;
        const book = await Book.create(bookdata)
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to create book",
            error
        })
    }
})

// get all books with filtering