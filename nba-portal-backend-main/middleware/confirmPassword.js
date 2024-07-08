const confimPassword = (req, res, next) => {
    const passwd = req.body['password']
    const cnfPasswd = req.body['confirmPassword']
    if (passwd != cnfPasswd) {
        res.status(500).json({
            message: "Passwords don't match"
        })
    } else {
        next()
    }
}

module.exports = confimPassword