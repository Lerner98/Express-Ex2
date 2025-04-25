const errorHandler = (error, req, res, next) => {
    console.error(`Error: ${error.message}`);
    res.status(500).json({
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
};

module.exports = errorHandler;