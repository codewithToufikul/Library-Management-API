import mongoose, { Model, Schema } from "mongoose";
import { IBook } from "../interface/book.interface";

const genres: string[] = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

interface BookModel extends Model<IBook> {
  updateAvailability(id: string): Promise<void>;
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true, enum: genres },
  isbn: { type: String, required: true, unique: true },
  description: { type: String },
  copies: { type: Number, required: true, min: 0 },
  available: { type: Boolean, default: true },
},{
    timestamps: true
});

bookSchema.statics.updateAvailability = async function (id: string) {
  const book = await this.findById(id);
  if (book) {
    book.available = book.copies > 0;
    await book.save();
  }
};

export const Book = mongoose.model<IBook, BookModel>('Book', bookSchema);
