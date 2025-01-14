import jwt from"jsonwebtoken"

function cookieJwtAuth(req, res, next){
    const token = req.cookie.token;
    try {
        const user = jwt.verify(token, process.env.SERVER_SALT);
        req.user = user;
        next();
    } catch(err){
        res.clearCookie("token");
        return res.status(401)
    }
}

export default cookieJwtAuth