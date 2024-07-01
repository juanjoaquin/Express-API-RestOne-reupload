import z from "zod"


const bookSchema = z.object({
    title: z.string({
        invalid_type_error: "Book title must be a string",
        required_error: "Title is required",
        min: 1,
        max: 30,
        regex: /^[a-zA-Z\s]+$/
    }),
    year: z.number().int().positive().min(1800).max(2024),
    author: z.string ({
        invalid_type_error: "Author title must be a string",
        required_error: "Author is required",
        min: 1,
        max: 30,
        regex: /^[a-zA-Z\s]+$/ 
    }),
    pages: z.number().int().positive(),
    rating: z.number().min(0).max(10).default(5),
    poster: z.string().url(),
    genre: z.array(
        z.enum(["Ficción", "Autoayuda", "Realismo mágico", "Misterio", "Distopía", 
        "Ficción política", "Novela", "Drama", "Fantasia", "Aventura", "Juvenil", "Romance", "Clásico", "Parodia", "Tragedia", "Drama"]),
    {required_error: "Genere movie most be requeried",
    invalid_type_error: "Genere book most be array"}
    )
})

export function validateBooks(object) {
    return bookSchema.safeParse(object)
}

export function validatePartialBook(object) {
    return bookSchema.partial().safeParse(object)
}
