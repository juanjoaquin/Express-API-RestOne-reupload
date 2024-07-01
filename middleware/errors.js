export const handleError = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || 'Error interno del servidor: 500';
    const errorDetails = {
        error: true,
        status: statusCode,
        message: errorMessage,
        route: req.originalUrl,
        // timestamp: new Date(),
        
    };
    res.status(statusCode).json(errorDetails);
};