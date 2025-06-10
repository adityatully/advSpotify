import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllUsers = asyncHandler(async(req , res)=>{
    const currUserId = req.auth?.userId;

   const users = await User.find({clerkId: {$ne: currUserId}})
   if(!users || users.length === 0) {
       throw new ApiError(404, "No users found");
   }

   return res.status(200).json(
        new ApiResponse(
            200,
            "Users fetched successfully",
            users
        )
   )

})


export {getAllUsers}