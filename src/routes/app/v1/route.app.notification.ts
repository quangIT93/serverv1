import { Router } from 'express';
import notificationController from '../../../controllers/notification/RESTful/_controller.notification';
import verifyAccessToken from '../../../middlewares/middleware.verifyAccessToken';
const router = Router();

router.get('/all',
    verifyAccessToken,
    notificationController.readByAccountId
);

router.get('/new',
    verifyAccessToken,
    notificationController.readQuantityOfNewNotifications
);


router.put('/update',
    verifyAccessToken,
    notificationController.updateStatus
);

router.get(
    '/keyword',
    verifyAccessToken,
    notificationController.keyword.read
);

router.post(
    '/keyword', 
    verifyAccessToken,
    notificationController.keyword.create
);

router.put(
    '/keyword/update-status',
    verifyAccessToken,
    notificationController.keyword.updateStatus
);

router.delete(
    '/keyword/delete',
    verifyAccessToken,
    notificationController.keyword.delete
);

router.put(
    '/update-platform',
    verifyAccessToken,
    notificationController.updateTypeOfNotificationPlatform
)

export default router;