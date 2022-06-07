module.exports.handleDuplicateKeyError = (err, res) => {
    console.log("deneme", err)
    const field = Object.keys(err.keyValue);
    const code = 409;
    const error = `An account with that ${field} already exists.`;
    res.status(code).send({messages: error, fields: field});
}

module.exports.handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map(el => el.message);
    let code = 400;
    res.status(code).send({messages: errors, statusCode: code})
 }