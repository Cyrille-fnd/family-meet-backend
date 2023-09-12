import { Request, Response } from "express";
import { ulid } from "ulid";
import prismaClient from "../context";
import {StatusCodes} from "http-status-codes";
import {CreateUserBody, LoginUserBody} from "../types";
import generateToken from "../service/generate.token";
import hashPassword from "../service/hash.password";
import checkPassword from "../service/check.password";

const post = (async (req: Request, res: Response) => {
    const body = {...req.body, password: await hashPassword(req.body.password)} as CreateUserBody;

    try {
        const user = await prismaClient.user.create({
            data: {
                ...body,
                id: ulid()
            }
        })

        const token = generateToken(user.email, user.password);

        res.setHeader('Content-Type', 'application/json');
        res.setHeader("Access-Control-Allow-Origin","*");
        res.setHeader('x-auth-token', token)
        return res.status(StatusCodes.CREATED).json(user)
    } catch (e) {
        const message = e instanceof Error ? e.message : "unknown error"

        return res.status(StatusCodes.BAD_REQUEST).json(message)
    }
})

const get = (async (req: Request, res:Response) => {
    const {id} = req.params

    try {
        const user = await prismaClient.user.findUniqueOrThrow({
            where: {
                id
            }
        })
        return res.status(StatusCodes.OK).json(user)
    } catch (e) {
        const message = e instanceof Error ? e.message: "unknown error"

        return res.status(StatusCodes.NOT_FOUND).json(message)
    }
});


const login = (async (req: Request, res: Response) => {
    const body = req.body as LoginUserBody

    try {
        const user = await prismaClient.user.findUniqueOrThrow({
            where: {
                email: body.email
            }
        })

        if (!await checkPassword(body.password, user.password)) return res.status(StatusCodes.BAD_REQUEST).json("Bad Credentials")

        const token = generateToken(user.email, user.password)

        res.setHeader('x-auth-token', token)

        return res.status(StatusCodes.OK).json(user)
    } catch (e) {
        const message = e instanceof Error ? e.message: "unknown error"

        return res.status(StatusCodes.BAD_REQUEST).json(message)
    }
})

export default { post, get, login };
