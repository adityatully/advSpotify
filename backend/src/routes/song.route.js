import {Router} from "express"
import {ProtectRoute , RequireAdmin } from "../middleware/auth.middleware.js"
import {getAllSongs , getFeaturedSongs , getMadeForYouSongs , getTrendingSongs} from "../controllers/song.controller.js"

const router = Router() 
router.get("/" , ProtectRoute , RequireAdmin , getAllSongs)
router.get("/featured" , getFeaturedSongs)
router.get("/made-for-you" , getMadeForYouSongs)
router.get("/trending" , getTrendingSongs)



export default router 