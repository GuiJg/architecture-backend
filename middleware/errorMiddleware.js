const { startSession } = require("mongoose");

const errorMiddleware = (err, req, res, next) => {
    console.log('ID digitada inexistente');
    const statusCode = err.statusCode ? err.statusCode : 500;
    res.status(statusCode)
    res.json({message: err.message, stack: process.env.NODE_ENV === 'development' ? err.stack : null});
}

module.exports = errorMiddleware