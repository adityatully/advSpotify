import {  clerkClient } from "@clerk/express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

export const ProtectRoute = asyncHandler(async (req, res, next) => {
    if(!req.auth.userId){
        throw new ApiError(401, "Unauthorized access");
    }
    // if we have the UserId
    next(); 
})


export const RequireAdmin = asyncHandler(async (req, res, next) => {
    const user = await clerkClient.users.getUser(req.auth?.UserId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    
    const isAdmin = process.env.ADMIN_EMAIL === user.primaryEmailAddress.emailAddress ;

    if(!isAdmin) {
        throw new ApiError(403, "Access denied. Admins only.");
    }

    next();

})