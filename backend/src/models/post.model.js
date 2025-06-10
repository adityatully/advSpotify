import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
  
    description: {
      type: String,
      required: true,
    },
  
    postedBy: {
      type: String, // Clerk ID
      required: true,
      ref: "User"    // still useful for population if needed
    },
  
    college: {
      type: String,
      required: true,
    },
  
    tags: [{
      type: String
    }],
  
    interestedUsers: [{
      type: String, // also Clerk IDs
      ref: "User"
    }]
  
  }, { timestamps: true });
  
  export const Post = mongoose.model("Post", postSchema);
  