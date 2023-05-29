import { Router } from 'express';
import searchController from '../../../controllers/search/_controller.search';
import verifyAccessToken from '../../../middlewares/middleware.verifyAccessToken';
const router = Router();

//SEARCH
router.get(
    '',
    // verifyAccessToken,
    searchController.search
);
router.get(
    '/filter',
    // verifyAccessToken, 
    searchController.filter
);

router.get(
    '/history',
    verifyAccessToken,
    searchController.readHistorySearch
);

router.get(
    '/suggest',
    // verifyAccessToken,
    searchController.readSuggestedListSearch
)

export default router;