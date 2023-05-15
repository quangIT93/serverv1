import { Router } from 'express';
import notificationController from '../../../controllers/notification/_controller.notification';
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

export default router;