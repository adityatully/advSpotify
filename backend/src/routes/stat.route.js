import {Router} from 'express';
import { getStats } from '../controllers/stat.controller.js';
import {ProtectRoute , RequireAdmin } from "../middleware/auth.middleware.js"
const router = Router(); 

router.get("/" ,ProtectRoute ,RequireAdmin , getStats)


export default router; 