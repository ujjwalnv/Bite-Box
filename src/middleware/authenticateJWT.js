import express from 'express'
import { constants } from "http2";
import jwt from 'jsonwebtoken'
import { JWT_ACCESS_TOKEN_SECRET } from '../constants/env_constants.js';

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(constants.HTTP_STATUS_BAD_REQUEST).send({message: 'Authorization header is missing'});

    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.sendStatus(constants.HTTP_STATUS_FORBIDDEN);
        }

        req.user = user;
        next()
    })
}

export {
    authenticateJWT
}