import express from "express";
import postController from "../../controllers/post/_controller.post";
import verifyAccessToken from "../../middlewares/middleware.verifyAccessToken";
import { checkLimitAndThresholdParams } from "../../middlewares/utils/midleware.checkUtilsParams";
import { checkLanguageParams } from "../../middlewares/utils/midleware.checkLanguageParams";

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
router.get(
    "/newest", 
    checkLimitAndThresholdParams,
    checkLanguageParams,
    postController.readNewestAcceptedPosts
);

// READ NEARBY ACCEPTED POSTS
router.get(
    "/nearby",
    verifyAccessToken,
    checkLimitAndThresholdParams,
    checkLanguageParams,
    postController.readNearbyAcceptedPosts
);

// READ ACCEPTED POSTS BY THEME
router.get(
    "/theme", 
    checkLimitAndThresholdParams,
    checkLanguageParams,
    postController.readAcceptedPostsByTheme
);

// READ ACCEPTED POSTS IN BOOKMARK
router.get(
    "/bookmark",
    verifyAccessToken,
    checkLimitAndThresholdParams,
    checkLanguageParams,
    postController.readAcceptedPostsInBookmark
);

// READ POST BY ID
router.get(
    "/:id", 
    checkLanguageParams,
    postController.readPostById
);

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

//
router.get("/filter/post", postController.filterPostByAddress);

export default router;
