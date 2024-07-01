//  Este es el BookModel que estaba usando=> import { BookModel } from "../models/book.js";

//El de acá abajo es el que uso en MySQL
import { validatePartialBook } from "../schemas/bookSchemas.js"
import { BookModel } from "../database/db-mysql.js";


export class BookController {
    // Get all books, y obtener books por GENRE
    static async getAllSearch (req, res, next)  {
        try {
            const { genre } = req.query;
            const books = await BookModel.getAllSearch({ genre });
            
            if (books.length === 0) {
                return res.status(404).json({ message: "No se encontraron libros" });
            }
            return res.json(books);
            
        } catch (error) {
            next(error)
        }
        
    }
    // GET filter by ID
    static async getById (req, res, next) {
        try {

            const { id } = req.params;
            const getById = await BookModel.getById(id)
            if(getById) {
                return res.json(getById)
            } else {
                res.status(404).json({message: "No se pudo encontrar el id"})
            }
        } catch (error) {
            
            next(error)
        }
        
    }

    static async getTitle (req, res, next) {
        try {
            const { title } = req.params;

            const titles = await BookModel.getTitle({ title });
            if (titles.length === 0) {
                return res.status(404).json({ message: "No se pudo encontrar el title" });
            }
            return res.status(200).json(titles);
        } catch (error) {
            next(error)
        }}

    // POST crear un book
    static async create (req, res, next) {
        try {
            const result = validatePartialBook(req.body)
    
            if (result.error) {
                res.status(400).json({ error: JSON.parse(result.error.message) })
            }
    
            const newBook = await BookModel.create({input: result.data})
            res.status(201).json(newBook)

        } 
    
        catch (error) {
            next(error)
        }
    }

        // DELETE eliminar un book
        static async delete (req, res, next)  {
            try {
        
                const { id } = req.params
        
                const movieDelete = await BookModel.delete({id})
                if(movieDelete == false) {
                    return res.status(400).json({message: "Book not found"})
                } 
                return res.json({message: "Book eliminado"})

            }
            catch (error) {
                next(error)
            }
        }
        // POST actualizar un book

        static async update (req, res, next) {
            try {

                const result = validatePartialBook(req.body)
        
                if (!result.success) {
                    return res.status(404).json({ error: JSON.parse(result.error.message) })
                }
        
                const { id } = req.params
                const bookUpdate = await BookModel.update({id, input: result.data})
                return res.json(bookUpdate)
            }
            catch (error) {
                next(error)
            }
        }
}