import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const bookRoute = express.Router();

// create book
bookRoute.post("/", async (req: Request, res: Response) => {
  try {
    const bookdata = req.body;
    const book = await Book.create(bookdata);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create book",
      error,
    });
  }
});

// get all books with filtering
bookRoute.get("/", async (req: Request, res: Response) => {
  try {
    const { filter, sortBy = "createdAt", sort = "desc", limit } = req.query;
    const query: any = {};
    if (filter) {
      query.genre = filter;
    }
    const sortOrder = sort === "desc" ? -1 : 1;
    const books = await Book.find(query)
      .sort({ [sortBy as string]: sortOrder })
      .limit(Number(limit));
    res.status(201).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to Fetch books",
      error,
    });
  }
});

// get book by ID
bookRoute.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookid } = req.params;
    const book = await Book.findById({ bookid });
    res.status(201).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to Fetch book",
      error,
    });
  }
});
