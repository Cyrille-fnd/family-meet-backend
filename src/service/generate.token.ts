import getConfig from "../config";

const generateToken = (email: string, password: string): string => {
    const { JWT_SECRET_KEY } = getConfig()
    const jwt = require("jsonwebtoken");

    return jwt.sign({ email: email, password: password }, JWT_SECRET_KEY, { expiresIn: '3600s' })
}

export default generateToken
