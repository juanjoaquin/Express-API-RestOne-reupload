
import { Router } from "express";
import { BookController } from "../controllers/books.js";

export const booksRouter = Router()


// GET all books, y obtener books por GENRE
booksRouter.get("/", BookController.getAllSearch)

// GET filter by ID
booksRouter.get("/:id", BookController.getById);

// GET filtra por title books/title || NO => books?title=
booksRouter.get("/title/:title", BookController.getTitle);

// POST Creando la película
booksRouter.post("/", BookController.create)

// DELETE eliminar un book
booksRouter.delete("/:id", BookController.delete)

// POST actualizar un book
booksRouter.patch("/:id", BookController.update)

