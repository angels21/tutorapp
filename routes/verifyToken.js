const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header(auth-token);
    if(!token) return res.status(401).send('Access Denied');

    try {
        const tokenSecret = "qehagdfyw170vebxc834jg";
        const verified = jwt.verify(token, tokenSecret);
        req.user = verified;
    } catch (err) {
        res.status(400).send('Invalid Token');
    }

}