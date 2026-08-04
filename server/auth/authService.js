const { verifyToken } = require("./providers/jwt");


// MIDDLEWARE

const auth = (req, res, next) => {
    try {
        
        const tokenFromClient = req.header("x-auth-token");

        if (!tokenFromClient) {
            return res.status(401).send("Authentication Error: Please login");
        }

        // verify
        const userInfo = verifyToken(tokenFromClient);

        if (!userInfo) {
            return res.status(401).send("Authentication Error: Unauthorized user");
        }
        
        // Add user info to request object
        req.user = userInfo;
        next();
    } catch (error) {
        return res.status(401).send(error.message);
    }
};

module.exports = auth;