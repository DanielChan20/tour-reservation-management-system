import { Router } from 'express';
import {
  getGroups,
  createGroup,
  getGroupById,
  updateGroup,
  deleteGroup
} from '../controllers/group.Controller.js';

const router = Router();

router.get('/groups', getGroups);
router.post('/groups', createGroup);
router.get('/groups/:id', getGroupById);
router.put('/groups/:id', updateGroup);
router.delete('/groups/:id', deleteGroup);

export default router;

