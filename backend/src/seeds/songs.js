import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { config } from "dotenv";

config();

const songs = [
	{
		title: "Stay With Me",
		artist: "Sarah Mitchell",
		ImageUrl: "/cover-images/1.jpg",
		AudioUrl: "/songs/1.mp3",
		duration: 46, // 0:46
	},
	{
		title: "Midnight Drive",
		artist: "The Wanderers",
		ImageUrl: "/cover-images/2.jpg",
		AudioUrl: "/songs/2.mp3",
		duration: 41, // 0:41
	},
	{
		title: "Lost in Tokyo",
		artist: "Electric Dreams",
		ImageUrl: "/cover-images/3.jpg",
		AudioUrl: "/songs/3.mp3",
		duration: 24, // 0:24
	},
	{
		title: "Summer Daze",
		artist: "Coastal Kids",
		ImageUrl: "/cover-images/4.jpg",
		AudioUrl: "/songs/4.mp3",
		duration: 24, // 0:24
	},
	{
		title: "Neon Lights",
		artist: "Night Runners",
		ImageUrl: "/cover-images/5.jpg",
		AudioUrl: "/songs/5.mp3",
		duration: 36, // 0:36
	},
	{
		title: "Mountain High",
		artist: "The Wild Ones",
		ImageUrl: "/cover-images/6.jpg",
		AudioUrl: "/songs/6.mp3",
		duration: 40, // 0:40
	},
	{
		title: "City Rain",
		artist: "Urban Echo",
		ImageUrl: "/cover-images/7.jpg",
		AudioUrl: "/songs/7.mp3",
		duration: 39, // 0:39
	},
	{
		title: "Desert Wind",
		artist: "Sahara Sons",
		ImageUrl: "/cover-images/8.jpg",
		AudioUrl: "/songs/8.mp3",
		duration: 28, // 0:28
	},
	{
		title: "Ocean Waves",
		artist: "Coastal Drift",
		ImageUrl: "/cover-images/9.jpg",
		AudioUrl: "/songs/9.mp3",
		duration: 28, // 0:28
	},
	{
		title: "Starlight",
		artist: "Luna Bay",
		ImageUrl: "/cover-images/10.jpg",
		AudioUrl: "/songs/10.mp3",
		duration: 30, // 0:30
	},
	{
		title: "Winter Dreams",
		artist: "Arctic Pulse",
		ImageUrl: "/cover-images/11.jpg",
		AudioUrl: "/songs/11.mp3",
		duration: 29, // 0:29
	},
	{
		title: "Purple Sunset",
		artist: "Dream Valley",
		ImageUrl: "/cover-images/12.jpg",
		AudioUrl: "/songs/12.mp3",
		duration: 17, // 0:17
	},
	{
		title: "Neon Dreams",
		artist: "Cyber Pulse",
		ImageUrl: "/cover-images/13.jpg",
		AudioUrl: "/songs/13.mp3",
		duration: 39, // 0:39
	},
	{
		title: "Moonlight Dance",
		artist: "Silver Shadows",
		ImageUrl: "/cover-images/14.jpg",
		AudioUrl: "/songs/14.mp3",
		duration: 27, // 0:27
	},
	{
		title: "Urban Jungle",
		artist: "City Lights",
		ImageUrl: "/cover-images/15.jpg",
		AudioUrl: "/songs/15.mp3",
		duration: 36, // 0:36
	},
	{
		title: "Crystal Rain",
		artist: "Echo Valley",
		ImageUrl: "/cover-images/16.jpg",
		AudioUrl: "/songs/16.mp3",
		duration: 39, // 0:39
	},
	{
		title: "Neon Tokyo",
		artist: "Future Pulse",
		ImageUrl: "/cover-images/17.jpg",
		AudioUrl: "/songs/17.mp3",
		duration: 39, // 0:39
	},
	{
		title: "Midnight Blues",
		artist: "Jazz Cats",
		ImageUrl: "/cover-images/18.jpg",
		AudioUrl: "/songs/18.mp3",
		duration: 29, // 0:29
	},
];

const seedSongs = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		// Clear existing songs
		await Song.deleteMany({});

		// Insert new songs
		const created_songs =  await Song.insertMany(songs);
        console.log(created_songs) // array of documents or objects 
		console.log("Songs seeded successfully!");
	} catch (error) {
		console.error("Error seeding songs:", error);
	} finally {
		mongoose.connection.close();
	}
};


seedSongs();