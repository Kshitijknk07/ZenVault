import { Router } from 'express';
import { uploadFileController, downloadFileController, deleteFileController } from '../controllers/fileController';
import { requireAuth } from '@clerk/express';

const router = Router();

router.post('/upload', requireAuth(), uploadFileController);
router.post('/download', requireAuth(), downloadFileController);
router.post('/delete', requireAuth(), deleteFileController);

export default router;
