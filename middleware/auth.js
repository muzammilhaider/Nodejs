const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(403).json({
            status: 'error',
            data : {},
            message : "A token is required for authentication"
        })
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'node_crud')
        req.user = decode
    } catch (error) {
        res.status(401).json({
            status: 'error',
            data : {},
            message : "Invalid token"
        })
    }
    next()
}

module.exports = { auth }