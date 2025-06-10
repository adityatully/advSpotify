import mongoose from "mongoose"
import {User} from "../models/user.model.js"
import {Song} from "../models/song.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {Album} from "../models/album.model.js"


const getAllSongs = asyncHandler(async(req ,res)=>{

    const songs = await Song.find().sort({createdAt : -1})

    if(!songs){
        throw new ApiError(404 , "Couldnt get the songs")
    }

    res.json(songs)
})

const getFeaturedSongs = asyncHandler(async(req , res)=>{
    // fetch 6 random songs 
    const songs = await Song.aggregate([{
        $sample: { size: 6 }
    } , {
        $project : {
            _id : 1 ,
            title: 1,
            artist: 1,
            ImageUrl: 1,
            AudioUrl: 1
        }
    }])

    if(!songs || songs.length === 0){
        throw new ApiError(404 , "Couldnt get the featured songs")
    }

    return res.status(200).json(new ApiResponse(200 , "Featured songs fetched successfully" , songs))
})

const getMadeForYouSongs = asyncHandler(async(req , res)=>{
    const songs = await Song.aggregate([{
        $sample: { size: 4 }
    } , {
        $project : {
            _id : 1 ,
            title: 1,
            artist: 1,
            ImageUrl: 1,
            AudioUrl: 1
        }
    }])

    if(!songs || songs.length === 0){
        throw new ApiError(404 , "Couldnt get the featured songs")
    }

    return res.status(200).json(new ApiResponse(200 , "Featured songs fetched successfully" , songs))
})

// update song model with umer of steams and owner then get trending top 6 
const getTrendingSongs = asyncHandler(async(req , res)=>{
    const songs = await Song.aggregate([{
        $sample: { size: 6 }
    } , {
        $project : {
            _id : 1 ,
            title: 1,
            artist: 1,
            ImageUrl: 1,
            AudioUrl: 1
        }
    }])

    if(!songs || songs.length === 0){
        throw new ApiError(404 , "Couldnt get the featured songs")
    }

    return res.status(200).json(new ApiResponse(200 , "Featured songs fetched successfully" , songs))
})

export {getAllSongs , getFeaturedSongs , getMadeForYouSongs , getTrendingSongs}