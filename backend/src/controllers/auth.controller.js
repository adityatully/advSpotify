import mongoose from "mongoose"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const authCallback = asyncHandler(async (req, res) => {
    const { id, firstName, lastName, imageUrl } = req.body;
  
    if (!id || !firstName || !lastName || !imageUrl) {
      throw new ApiError(400, "Invalid request data");
    }
  
    let user = await User.findOne({ clerkId: id });
  
    if (!user) {
      user = await User.create({
        fullName: `${firstName} ${lastName}`,
        imageUrl, 
        clerkId: id
      });
    }
  
    return res.status(200).json(
      new ApiResponse(
        200,
        "User authenticated successfully",
        user
      )
    );
  });
  



export {authCallback}