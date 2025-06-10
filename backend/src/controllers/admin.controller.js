import mongoose from "mongoose"
import {User} from "../models/user.model.js"
import {Song} from "../models/song.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {Album} from "../models/album.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { isValidObjectId } from "mongoose"

const CreateSong = asyncHandler(async (req, res) => {
    // user wud be logged in and admin tbhi yaha aa payenge 
    // req.auth.userId hoga 
    // we will take the song and upload to cloudinary first 
    if(!req.files || !req.files.audioFile || !req.files.imageFile){
        throw new ApiError(404 , "Please Upload All Files")
    }

    const {title , artist , albumId , duration} = req.body 


    const audioFile = req.files.audioFile
    const imageFile = req.files.imageFile 

    const UploadedAudio = await uploadOnCloudinary(audioFile)
    const UploadedImage = await uploadOnCloudinary(imageFile)

    if (!UploadedAudio?.url || !UploadedImage?.url) {
        throw new ApiError(500, "Cloudinary upload failed");
    }




    const song = new Song({
        title , 
        artist , 
        AudioUrl : UploadedAudio.url, 
        ImageUrl : UploadedImage.url , 
        duration ,
        albumId : albumId || null 
    })

    await song.save()

    // if song belongs to an album , update albyms sng array
    if(albumId){
        await Album.findByIdAndUpdate(albumId ,{
            $push :{
                songs : song._id
            }
        } , {new : true})
    }

    return res.status(200).json(
        new ApiResponse(200 , song , "Song created successfully")
    )


})

const DeleteSong = asyncHandler(async (req , res) =>{
    // user is logged in and admin so now we have req.auth se clerk id 
    const {Id} = req.params
    if(!isValidObjectId(Id)){
        throw new ApiError(404 , "please enter a valid id ")
    }

    const song = Song.findById(Id)

    if(!song){
        throw new ApiError(404 , "Please enter valid song Id")
    }

    // we can del but we also need to delete the song from the album
    const albumId = song.albumId

    if(albumId){
        await Album.findByIdAndUpdate(albumId , {
            $pull : {
                songs : song._id
            }
        } , {new : true})
    }

    await Song.findByIdAndDelete(Id)

    return res.status(200).json(
        new ApiResponse(200 , "Song deleted successfully")
    )


})

const CreateAlbum = asyncHandler(async(req ,res)=>{
    const {title , artist , releaseYear} = req.body 

    if(!title || !artist || !releaseYear){
        throw new ApiError(404 , "Please enter all fields")
    }

    const {ImageFile} = req.files

    const ImageFileUrl = await uploadOnCloudinary(ImageFile).url 

    const album = new Album({
        title ,
        artist , 
        releaseYear ,
        ImageUrl : ImageFileUrl 
    })

    await album.save() 

    return res.status(200).json(
        new ApiResponse(200 , album , "Album created succcessfully")
    )

})

const DeleteAlbum = asyncHandler(async(req ,res)=>{
    const {Id} = req.params 
    await Song.deleteMany({albumId : Id})
    await Album.findByIdAndDelete(Id)
    return res.status(200).json(
        new ApiResponse(200 , "Album deleted ")
    )
})

const checkAdmin = asyncHandler(async(req , res)=>{
    return res.status(200).json(
        {
            admin : true 
        }
    )
})

export {CreateSong , DeleteSong , CreateAlbum , DeleteAlbum ,  checkAdmin}