import { Request, Response } from "express";
import {StatusCodes} from "http-status-codes";

const home = ((req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin","*");
    // res.setHeader("Access-Control-Allow-Origin","http://hello-world-frontend-13082023.s3-website.eu-west-3.amazonaws.com");

    return res.status(StatusCodes.OK).json({
        data: {
            message: "Hello World venant du backend"
        }
    });
});

export default { home };
