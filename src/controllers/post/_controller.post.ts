import readAcceptedPostsOfMyAccountController from "./controller.post.readAcceptedPostsOfMyAccount";
import readPostByIdController from "./controller.post.readPostById";
import readAcceptedPostsOfAnotherAccountController from "./controller.post.readAcceptedPostsOfAnotherAccount";
import readAcceptedPostsInBookmarkController from "./controller.post.readAcceptedPostsInBookmark";
import readAcceptedPostsByThemeController from "./controller.post.readAcceptedPostsByTheme";
import readPostsByAdminController from "./controller.post.readPostsByAdmin";
import readNewestAcceptedPostsController from "./controller.post.readNewestAcceptedPosts";
import readNearbyAcceptedPostsController from "./controller.post.readNearbyAcceptedPosts";
import readAllPostsByThemeController from "./controller.post.readAllPostsByTheme";
import countPostQuantityByAdminController from "./controller.post.countPostQuantityByAdmin";

import createPostController from "./controller.post.create";
import updatePostInformationController from "./controller.post.updateInformation";
import updateInformationByAdminController from "./controller.post.updateInformationByAdmin";
import updatePostStatusController from "./controller.post.updateStatus";
import updateStatusOfManyPostsController from "./controller.post.updateStatusOfManyPosts";
import readPostByIdByAdminController from "./controller.post.readPostByIdByAdmin";

const postController = {
    // READ ALL POSTS
    readPostsByAdmin: readPostsByAdminController,

    // READ ALL POSTS BY THEME
    readAllPostsByTheme: readAllPostsByThemeController,

    // READ ACCEPTED POSTS OF OWN ACCOUNT
    readAcceptedPostsOfMyAccount: readAcceptedPostsOfMyAccountController,

    // READ ACCEPTED POSTS OF ANOTHER ACCOUNT
    readAcceptedPostsOfAnotherAccount:
        readAcceptedPostsOfAnotherAccountController,

    // READ ACCEPTED POSTS IN BOOKMARK
    readAcceptedPostsInBookmark: readAcceptedPostsInBookmarkController,

    // READ ACCEPTED POSTS BY THEME
    readAcceptedPostsByTheme: readAcceptedPostsByThemeController,

    // READ NEWEST ACCEPTED POSTS
    readNewestAcceptedPosts: readNewestAcceptedPostsController,

    // READ NEARBY ACCEPTED POSTS
    readNearbyAcceptedPosts: readNearbyAcceptedPostsController,

    // READ POST BY ID
    readPostById: readPostByIdController,

    // READ POST BY ID BY ADMIN
    readPostByIdByAdmin: readPostByIdByAdminController,

    // COUNT BY ADMIN
    countPostQuantityByAdmin: countPostQuantityByAdminController,

    // CREATE POST
    create: createPostController,

    // UPDATE POST INFORMATION
    updateInformationByAdmin: updateInformationByAdminController,
    updateInformation: updatePostInformationController,

    // UPDATE POST STATUS
    updateStatus: updatePostStatusController,

    // UPDATE STATUS OF MANY POSTS
    updateStatusOfManyPosts: updateStatusOfManyPostsController,
};

export default postController;
