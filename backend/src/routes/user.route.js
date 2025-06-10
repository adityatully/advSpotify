import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller.js";
import { CreateSong , DeleteSong , DeleteAlbum ,CreateAlbum , checkAdmin} from "../controllers/admin.controller.js";
import {ProtectRoute , RequireAdmin } from "../middleware/auth.middleware.js"

const router = Router()  ;


router.get("/" , ProtectRoute , getAllUsers);

 // todo get messages 

export default router 