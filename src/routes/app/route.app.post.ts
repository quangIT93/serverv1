import express from "express";
import postController from "../../controllers/post/_controller.post";
import verifyAccessToken from "../../middlewares/middleware.verifyAccessToken";

const router = express.Router();

// READ POSTS BY ADMIN
router.get("/by-admin", verifyAccessToken, postController.readPostsByAdmin); // ADMIN ROLE

// READ ALL POSTS BY THEME
router.get("/theme/all", verifyAccessToken, postController.readAllPostsByTheme); // ADMIN ROLE

// READ ACCEPTED POSTS OF OWN ACCOUNT
router.get(
    "/own",
    verifyAccessToken,
    postController.readAcceptedPostsOfMyAccount
);

// READ ACCEPTED POSTS OF ANOTHER ACCOUNT
router.get("/acc", postController.readAcceptedPostsOfAnotherAccount);

// READ NEWEST ACCEPTED POSTS
router.get("/newest", postController.readNewestAcceptedPosts);

// READ NEARBY ACCEPTED POSTS
router.get(
    "/nearby",
    verifyAccessToken,
    postController.readNearbyAcceptedPosts
);

// READ ACCEPTED POSTS BY THEME
router.get("/theme", postController.readAcceptedPostsByTheme);

// READ ACCEPTED POSTS IN BOOKMARK
router.get(
    "/bookmark",
    verifyAccessToken,
    postController.readAcceptedPostsInBookmark
);

// READ POST BY ID
router.get("/:id", postController.readPostById);

router.get(
    "/by-admin/count-quantity",
    verifyAccessToken,
    postController.countPostQuantityByAdmin
); // ADMIN ROLE

// READ POST BY ID BY ADMIN
router.get(
    "/by-admin/:id",
    verifyAccessToken,
    postController.readPostByIdByAdmin
); // ADMIN ROLE

// CREATE POST
router.post("/", verifyAccessToken, postController.create);

// UPDATE POST INFORMATION
router.put(
    "/inf/by-ad",
    verifyAccessToken,
    postController.updateInformationByAdmin
); // ADMIN

router.put("/inf", verifyAccessToken, postController.updateInformation);

// UPDATE STATUS OF MANY POSTS
router.put(
    "/sta/many",
    verifyAccessToken,
    postController.updateStatusOfManyPosts
); // ADMIN

// UPDATE POST STATUS
router.put("/sta", verifyAccessToken, postController.updateStatus);

export default router;
