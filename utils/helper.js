exports.userNotFound = async (req, res, user, message) => {
    if (!user) {
        res.status(404).json({
            status : "error",
            data: {},
            message : message
        })
    }
}