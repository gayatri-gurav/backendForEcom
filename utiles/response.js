module.exports.responsereturn = (res,code,data) => {
    return res.status(code).json(data)
}