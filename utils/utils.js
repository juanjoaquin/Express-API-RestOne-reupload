import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
export const readJSON = (path) => require(path)

//Remover acento
export function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Función para validar el formato del ID
export function isValidUUID(id) {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(id);
}

// import { createRequire } from "node:module";
// import path from "node:path";
// const require = createRequire(import.meta.url)
// export const booksJSON = (path) => require(path)