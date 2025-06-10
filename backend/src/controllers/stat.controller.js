import  {asyncHandler} from "../utils/asyncHandler.js"
import {Song} from "../models/song.model.js"
import {User} from "../models/user.model.js"
import {Album} from "../models/album.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const getStats = asyncHandler(async (req, res) => {
    //const totalSongs = await Song.countDocuments();
    //const totalUsers = await User.countDocuments();
    //const totalAlbums = await Album.countDocuments();
    
    const [totalSongs, totalUsers, totalAlbums , uniqueArtists] = await Promise.all([
        Song.countDocuments(),
        User.countDocuments(),
        Album.countDocuments(), 
        Song.aggregate([
            {
                $unionWith : {
                    coll: "albums" , 
                    pipeline:[]
                }
            }
            , {
                $group : {
                    _id : "$artist"
                }
            } ,{
                $count : "count"
            }
        ])
    ]) 
    if(!totalAlbums){
        throw new ApiError(404, "No albums found");
    }

    if(!totalSongs){
        throw new ApiError(404, "No songs found");
    }
    if(!totalUsers){
        throw new ApiError(404, "No users found");
    }

    if(!uniqueArtists){
        throw new ApiError(404, "No artists found");
    }

    return res.status(200).json(
        new ApiResponse(200 , {totalAlbums , totalSongs , totalUsers , uniqueArtists: uniqueArtists[0]?.count||0} , "Stats fetched successfully")
    ) 
})

export {getStats}