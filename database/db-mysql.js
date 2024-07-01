import mysql from "mysql2/promise"

const config = {
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "booksDB"
}

const connection = await mysql.createConnection(config)

export class BookModel {
    static async getAllSearch({ genre }) {
        try {
            if (genre) {
                const lowerGenre = genre.toLowerCase()
                const [genres] = await connection.query("SELECT id FROM genre WHERE LOWER(name) = ?;", [lowerGenre])
                if (genres.length === 0) return { error: "No se pudo encontrar el libro/género" }
                const [{ id: genreId }] = genres

                const [books] = await connection.query(`
                SELECT b.title, b.year, b.author, b.rating, b.poster, b.pages, BIN_TO_UUID(b.id) as id
                FROM books b
                INNER JOIN book_genres bg ON b.id = bg.book_id
                WHERE bg.genre_id = ?`, [genreId])
                return books
            }


            const [allBooks] = await connection.query("SELECT title, year, author, rating, poster, pages, BIN_TO_UUID(id) id FROM books")
            return allBooks
        }
        catch (error) {
            throw new Error("Ocurrió un error en el sistema al obtener los libros.");
        }
    }

    //GET obtener title
    static async getTitle({ title }) {
        
        try {
            if (title) {
                const lowerTitle = title.toLowerCase();
                const [booksTitle] = await connection.query(`
            SELECT title, year, author, rating, poster, pages, BIN_TO_UUID(id) id
            FROM books 
            WHERE LOWER(title) = ?`, [lowerTitle]);

                if (booksTitle.length === 0) {
                    return { error: `No se pudo encontrar el título: ${title}` };
                }
                return booksTitle;
            }
        } catch (error) {
            throw new Error("Ocurrió un error en el sistema al obtener el título.");
        }
    }

    static async getById(id) {
        try {
            const [books] = await connection.query(`
            SELECT title, year, author, rating, poster, pages, BIN_TO_UUID(id) id
            FROM books WHERE id = UUID_TO_BIN(?);`, [id])

            if (books.length === 0) {
                return { error: `No se pudo encontrar el ID del book: ${id}` }
            }

            return books[0]
        }
        catch (error) {
            throw new Error("Ocurrió un error en el sistema al obtener el ID.");
        }
    }

    static async create({ input }) {
        const {
            genre: genreInput, // genre is an array
            title,
            year,
            author,
            rating,
            pages,
            poster
        } = input;

        const connection = await mysql.createConnection(config);

        const [uuidResult] = await connection.query('SELECT UUID() uuid;');
        const [{ uuid }] = uuidResult;

        try {
            await connection.query(
                `INSERT INTO books (id, title, year, author, rating, pages, poster)
                VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
                [title, year, author, rating, pages, poster]
            );

        } catch (error) {
            throw error({ message: "Error interno del servidor" });
        }
        const [books] = await connection.query(
            `SELECT title, year, author, rating, poster, pages, BIN_TO_UUID(id) as id
                FROM books WHERE id = UUID_TO_BIN(?);`,
            [uuid]
        );

        return books[0];


    }


    static async delete({ id }) {
        try {
            const [books] = await connection.query(`
            SELECT title, year, author, rating, poster, pages,
            BIN_TO_UUID(id) id 
            FROM books 
            WHERE id = UUID_TO_BIN(?);`, [id])

            if (books.length === 0) return false

            const [deleteBook] = await connection.query("DELETE FROM books WHERE id = UUID_TO_BIN(?);", [id])
            return deleteBook
        }
        catch (error) {
            throw new Error("Error del servidor")
        }

    }

    static async update({ id, input }) {
        const {
            title,
            author,
            pages
        } = input

        try {
            const [result] = await connection.query("UPDATE books SET title = ?, author = ?, pages = ? WHERE id = UUID_TO_BIN(?);", [title, author, pages, id])
            if (result) {
                const [updateBook] = await connection.query(`
            SELECT title, author, year,
            BIN_TO_UUID(id) id FROM books WHERE id = UUID_TO_BIN(?)`, [id])
                if (updateBook.length === 0) return { message: "No se pudo updatear el book" }
                return updateBook[0]
            } else {
                return "Noo"
            }
        }
        catch (error) {
            throw new Error("Error book")
        }
    }
}