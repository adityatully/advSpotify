import e from "express";
import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Album',
    },
    duration: {
        type: Number, // duration in seconds
        required: true
    },
    ImageUrl: {
        type: String,
        required: true
    },
    AudioUrl: {
        type: String,
        required: true
    }
} , {timestamps:true});

// artist also a clerk id , owner 
export const Song = mongoose.model("Song", songSchema);