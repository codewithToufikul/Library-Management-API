# 📚 Book Management & Borrowing API

A simple and clean Node.js + Express API to manage books in a library system and handle borrowing requests efficiently.

## 🌐 Live Link

🔗 [Visit Live API](https://library-api-black.vercel.app)

---

## 🚀 Features

- 📖 Add, update, and list books
- 📊 Filter, sort, and limit books by genre and time
- 📦 Borrow books with quantity and due date
- ✅ Automatically updates book availability
- 📈 Aggregated summary of borrowed books

---

## ⚙️ Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- TypeScript
- Postman

---

## 🔧 Project Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/codewithToufikul/Library-Management-API
   ```

2. Navigate into the project:

   ```bash
   cd Library-Management-API
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in root and add:

   ```env
   DB_USER=your-db-user
   DB_PASS=your-db-pass
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

---

## 📌 API Endpoints

### 📘 1. Create a Book

`POST /api/books`

**Request:**

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

---

### 📚 2. Get All Books

`GET /api/books?filter=FANTASY&sort=asc&sortBy=createdAt&limit=5`

**Query Parameters:**

- `filter`: Genre (optional)
- `sort`: asc/desc (optional)
- `sortBy`: Field to sort by (default: `createdAt`)
- `limit`: Number of results (default: 10)

---

### ✏️ 3. Update Book

`PUT /api/books/:bookId`

**Request:**

```json
{
  "copies": 0
}
```

> Copies become 0? System will auto set `available: false`

---

### 📦 4. Borrow a Book

`POST /api/borrow`

**Request:**

```json
{
  "book": "BOOK_OBJECT_ID",
  "quantity": 2,
  "dueDate": "2025-07-18"
}
```

---

### 📊 5. Borrow Summary

`GET /api/borrow`

**Returns:**

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}
```

---

## ❗ Error Handling

All responses are wrapped with consistent format:

- ✅ Success Response:

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {...}
}
```

- ❌ Error Response:

```json
{
  "success": false,
  "message": "Book not found",
  "error": {...}
}
```

---

## 🎥 Video Explanation

📺 [Click here to watch the demo](https://drive.google.com/file/d/1bSruimzKZ9aR4Of43ITs9ymhRiGHcUL2/view)
