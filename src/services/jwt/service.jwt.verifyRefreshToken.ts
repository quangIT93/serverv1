import jwt from "jsonwebtoken";
import redisClient from "../../configs/redis";

interface Payload {
    id: string;
    role: number;
}

const verifyRefreshTokenService = (refreshToken: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async function (err, payload: Payload) {
                if (err) {
                    // Token expired
                    if (err.name === "TokenExpiredError") {
                        reject("Refresh token expired");
                    }

                    reject("Verify refresh token failure");
                }

                // Get payload
                const { id } = payload;

                // Get refresh token by email in redis
                try {
                    const reply = await redisClient.get(id);
                    if (reply === null || refreshToken !== reply) {
                        reject("Invalid refresh token");
                    } else {
                        resolve(payload);
                    }
                } catch (error) {
                    reject("Get refresh token by email error");
                }

                // redisClient.get(id, (err, reply) => {
                //     if (err) {
                //         reject("Get refresh token by email error");
                //     }

                //     // Check refresh token is valid
                //     if (refreshToken !== reply) {
                //         reject("Invalid refresh token");
                //     }

                //     // Success
                //     resolve(payload);
                // });
            }
        );
    });
};

export default verifyRefreshTokenService;
