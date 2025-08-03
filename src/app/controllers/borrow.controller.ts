import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

export const borrowRoute = express.Router();

// borrow a book
borrowRoute.post("/", async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    if (book.copies < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${book.copies} copies are available`,
      });
    }
    book.copies -= quantity;
    await book.save();
    await Book.updateAvailability(bookId);
    const borrow = await Borrow.create({
      book: book._id,
      quantity,
      dueDate,
    });
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to Borrow book",
      error,
    });
  }
});

// get borrow with agregation

borrowRoute.get("/", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to Fetch Borrow book",
      error,
    });
  }
});
