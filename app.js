import express, {json} from "express";

const app = express();
import { booksRouter } from "./routes/rutas.js";

import { handleError } from "./middleware/errors.js";


app.use(json())

const PORT = process.env.port ?? 1234


// Get all books, y obtener books por GENRE
app.use("/books", booksRouter)
app.use(handleError)



app.listen(PORT, () => {
    console.log(`Listening on server: http://localhost:${PORT}`)
})