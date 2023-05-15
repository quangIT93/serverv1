import { Router } from 'express';
const router = Router();
import applicationController from '../../../controllers/application/_controller.application';
import verifyAccessToken from "../../../middlewares/middleware.verifyAccessToken";

router.post('/create', verifyAccessToken, applicationController.createApplication);
router.put('/update', verifyAccessToken, applicationController.updateApplication);
router.put('/like', verifyAccessToken, applicationController.updateLikeStatus);
router.delete('/delete', verifyAccessToken, applicationController.deleteApplication);

export default router;