import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { config } from "dotenv";

config();

const seedDatabase = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		// Clear existing data
		await Album.deleteMany({});
		await Song.deleteMany({});

		// First, create all songs
		const createdSongs = await Song.insertMany([
			{
				title: "City Rain",
				artist: "Urban Echo",
				ImageUrl: "/cover-images/7.jpg",
				AudioUrl: "/songs/7.mp3",
				duration: 39, // 0:39
			},
			{
				title: "Neon Lights",
				artist: "Night Runners",
				ImageUrl: "/cover-images/5.jpg",
				AudioUrl: "/songs/5.mp3",
				duration: 36, // 0:36
			},
			{
				title: "Urban Jungle",
				artist: "City Lights",
				ImageUrl: "/cover-images/15.jpg",
				AudioUrl: "/songs/15.mp3",
				duration: 36, // 0:36
			},
			{
				title: "Neon Dreams",
				artist: "Cyber Pulse",
				ImageUrl: "/cover-images/13.jpg",
				AudioUrl: "/songs/13.mp3",
				duration: 39, // 0:39
			},
			{
				title: "Summer Daze",
				artist: "Coastal Kids",
				ImageUrl: "/cover-images/4.jpg",
				AudioUrl: "/songs/4.mp3",
				duration: 24, // 0:24
			},
			{
				title: "Ocean Waves",
				artist: "Coastal Drift",
				ImageUrl: "/cover-images/9.jpg",
				AudioUrl: "/songs/9.mp3",
				duration: 28, // 0:28
			},
			{
				title: "Crystal Rain",
				artist: "Echo Valley",
				ImageUrl: "/cover-images/16.jpg",
				AudioUrl: "/songs/16.mp3",
				duration: 39, // 0:39
			},
			{
				title: "Starlight",
				artist: "Luna Bay",
				ImageUrl: "/cover-images/10.jpg",
				AudioUrl: "/songs/10.mp3",
				duration: 30, // 0:30
			},
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
				title: "Moonlight Dance",
				artist: "Silver Shadows",
				ImageUrl: "/cover-images/14.jpg",
				AudioUrl: "/songs/14.mp3",
				duration: 27, // 0:27
			},
			{
				title: "Lost in Tokyo",
				artist: "Electric Dreams",
				ImageUrl: "/cover-images/3.jpg",
				AudioUrl: "/songs/3.mp3",
				duration: 24, // 0:24
			},
			{
				title: "Neon Tokyo",
				artist: "Future Pulse",
				ImageUrl: "/cover-images/17.jpg",
				AudioUrl: "/songs/17.mp3",
				duration: 39, // 0:39
			},
			{
				title: "Purple Sunset",
				artist: "Dream Valley",
				ImageUrl: "/cover-images/12.jpg",
				AudioUrl: "/songs/12.mp3",
				duration: 17, // 0:17
			},
		]);

		// Create albums with references to song IDs
		const albums = [
			{
				title: "Urban Nights",
				artist: "Various Artists",
				ImageUrl: "/albums/1.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(0, 4).map((song) => { return song._id; }),    
			},
			{
				title: "Coastal Dreaming",
				artist: "Various Artists",
				ImageUrl: "/albums/2.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(4, 8).map((song) => { return song._id; }),
			},
			{
				title: "Midnight Sessions",
				artist: "Various Artists",
				ImageUrl: "/albums/3.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(8, 11).map((song) => { return song._id; }),
			},
			{
				title: "Eastern Dreams",
				artist: "Various Artists",
				ImageUrl: "/albums/4.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(11, 14).map((song) => { return song._id; }),
			},
		];

		// Insert all albums
		const createdAlbums = await Album.insertMany(albums);
        //console.log("Albums created:", createdAlbums);

		// Update songs with their album references
		for (let i = 0; i < createdAlbums.length; i++) {
			const album = createdAlbums[i];
			const albumSongs = albums[i].songs;

		   const updatedSongs =  await Song.updateMany({ _id: { $in: albumSongs } }, { albumId: album._id });
           console.log(updatedSongs)
		}

		console.log("Database seeded successfully!");
	} catch (error) {
		console.error("Error seeding database:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedDatabase();