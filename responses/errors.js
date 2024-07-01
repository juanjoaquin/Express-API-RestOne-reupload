import { response } from "express";
import { error } from "../middleware/errors.js";

export function errors(err, req, res, next) {
    console.error("[error", err)

    const message = err.message || "Error 500 interno"
    const status = err.statusCode || 500

    return error(req, res, message, status) ;
    
}