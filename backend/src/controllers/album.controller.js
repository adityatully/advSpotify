import mongoose from "mongoose"
import {User} from "../models/user.model.js"
import {Song} from "../models/song.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {Album} from "../models/album.model.js"




const getAllAlbums = asyncHandler(async(req , res)=>{
    const albums = await Album.find()
    return res.status(200).json(
        new ApiResponse(200 , albums , "All albums fetched successfulyly")
    )
})

const getAlbumById = asyncHandler(async(req , res)=>{
    const {albumId} = req.params 

    const album = await Album.findById(albumId).populate("songs")
    if(!album){
        throw new ApiError(404 , "Couldnt find an album , enter valif album id ")
    }

    return res.status(200).json(
        new ApiResponse(200 , album , " album fetched successfulyly")
    )

})


export {getAllAlbums ,getAlbumById }