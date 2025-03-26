import { Router } from 'express';
import {
  uploadFileController,
  downloadFileController,
  deleteFileController,
  listFilesController,
} from '../controllers/fileController';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

const router = Router();
const requireAuth = ClerkExpressRequireAuth();

const asyncHandler = (fn: Function) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post('/upload', requireAuth, asyncHandler(uploadFileController));
router.get('/:fileId', requireAuth, asyncHandler(downloadFileController));
router.delete('/:fileId', requireAuth, asyncHandler(deleteFileController));
router.get('/', requireAuth, asyncHandler(listFilesController));

export default router;
