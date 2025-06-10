import { Router } from "express";
import { CreateSong , DeleteSong , DeleteAlbum ,CreateAlbum , checkAdmin} from "../controllers/admin.controller.js";
import {ProtectRoute , RequireAdmin } from "../middleware/auth.middleware.js"


const router = Router() 

router.use(ProtectRoute , RequireAdmin )

router.get("/check" ,  checkAdmin)
router.post("/songs" ,  CreateSong)
router.delete("/songs/:id" ,  DeleteSong)
router.post("/albums" ,   CreateAlbum)
router.delete("/albums/:id" ,  DeleteAlbum)




export default router  