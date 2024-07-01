
export function responseSuccess (req, res, mensaje, status ) {
    const statusCode = status || 200;
    const messageOk = mensaje || "";
    res.status(statusCode).send ({
        error: false,
        status: statusCode,
        body: messageOk
    })
}

export function responseError (req, res, mensaje, status) {
    const statusCode = status || 500;
    const messageError = mensaje || "Hay un error interno";
    res.status(statusCode).send ({
        error: true,
        status: statusCode,
        body: messageError
    })
}

