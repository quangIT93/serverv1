import jwt from "jsonwebtoken";
import redisClient from "../../configs/redis";

interface Payload {
    id: string;
    role: number;
}

const signRefreshTokenService = async (payload: Payload) => {
    return new Promise((resolve, reject) => {
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const options = {
            expiresIn: "30d",
        };
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                reject(err);
            }

            // SET REFRESH TOKEN TO REDIS
            redisClient.set(
                payload.id,
                token,
                {
                    EX: 60 * 60 * 24 * 30,
                },
            );
            resolve(token);
        });
    });
};

export default signRefreshTokenService;
