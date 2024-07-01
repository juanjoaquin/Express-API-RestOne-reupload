const booksJSON = readJSON("../books.json")
import { randomUUID } from "node:crypto";
import { readJSON, removeAccents } from "../utils/utils.js";

export class BookModel {
    static async getAllSearch ({genre, search}) {
        if (genre) {
            const noAccents = removeAccents(genre.toLowerCase());
            const booksByGenre = booksJSON.filter(book => book.genre.some(g => removeAccents(g.toLowerCase()) === noAccents));
            return booksByGenre;
        }
    
        if (search) {
            const noAccentsSearch = removeAccents(search.toLowerCase());
            const bookSearch = booksJSON.filter(book => removeAccents(book.title.toLowerCase()) === noAccentsSearch);
            return bookSearch;
        }
    
        return booksJSON;
    }

    static async getById(id) {
        const bookById = booksJSON.find(book => book.id === id)
        if(bookById) return bookById
    }

    static async create({input}) {
        const id = randomUUID()
        const newBook = {
            id: id,
            ...input
        }
        booksJSON.push(newBook)
        return newBook
    }

    static async delete ({id}) {
        const bookDelete = booksJSON.findIndex(book => book.id === id)
        if(bookDelete === -1) return false
        
        booksJSON.splice(bookDelete, 1)
        return true
    }

    static async update ({id, input}) {
        const bookUpdate = booksJSON.findIndex(book => book.id === id) 
        if(bookUpdate == -1) return false
        

        booksJSON[bookUpdate] = {
            ...booksJSON[bookUpdate],
            ...input
        }

        return booksJSON[bookUpdate]
    }
}