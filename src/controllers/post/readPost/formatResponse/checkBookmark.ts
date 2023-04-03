import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import { NextFunction } from 'express';
import { Request } from 'express';
import { PostResponse, PostService } from "../../../../interface/Post";
import logging from '../../../../utils/logging';
import { readByAccountId } from '../../../../services/bookmark/_service.bookmark';

const checkBookmark = async (
    posts: PostResponse[],
    req: Request,
    next: NextFunction
): Promise<PostResponse[] | void> => {
    if (req.headers.authorization) {
        const headerAuthorization = req.headers.authorization;
        // GET ACCESS TOKEN
        const accessToken = headerAuthorization.split("Bearer")[1]
            ? headerAuthorization.split("Bearer")[1].toString().trim()
            : null;

        if (!accessToken) {
            logging.warning("Invalid access token");
            return next(createError(401));
        }

        // VERIFY ACCESS TOKEN
        try {
            const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as { id: string, role: number };
            const accountId = payload.id;

            // GET BOOKMARKS OF ACCOUNT
            const bookmarks = await readByAccountId(
                accountId
            );

            if (!bookmarks) {
                return next(createError(500, "Internal server error"));
            }
            const postIdsOnBookmark = bookmarks.map(
                (bookmark) => bookmark.post_id
            );


            // SUCCESS
            return posts.map((post) => ({
                ...post,
                bookmarked: postIdsOnBookmark.includes(post.id),
            }));


        } catch (error) {
            // EXPIRED ERROR
            if (error.name === "TokenExpiredError") {
                logging.error("Token expired");
                return next(createError(403));
            }
        }
    } else {
        // SUCCESS
        return posts;
    }
}

export { checkBookmark };