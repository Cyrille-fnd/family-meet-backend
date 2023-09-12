import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import getConfig from "../config";


const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const jwt = require("jsonwebtoken")
    const { JWT_SECRET_KEY } = getConfig()
    const authToken = req.header('x-auth-token')

    if (authToken === undefined) return res.status(StatusCodes.UNAUTHORIZED).json()

    jwt.verify(authToken, JWT_SECRET_KEY, (err: any , decoded: any) => {

        if (err) return res.status(StatusCodes.UNAUTHORIZED).json()

        if (decoded) next()
    })
}

export default authMiddleware
