import express from "express"
import dotenv from "dotenv"
import connectDB from "./lib/db.js"
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import adminRoutes from "./routes/admin.route.js"
import songRoutes from "./routes/song.route.js"
import albumRoutes from "./routes/album.route.js"
import statRoutes from "./routes/stat.route.js"
import { clerkMiddleware } from '@clerk/express'
import fileUpload from "express-fileupload"
import path from "path"
import cors from "cors" 
dotenv.config() 



const __dirname = path.resolve();
const app = express() 
app.options('*', cors())


app.use(cors(
    {
        origin :  "http://localhost:3000",
        credentials: true, // Allow cookies to be sent with requests
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }
))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
// app.use(cookieParser())
app.use(clerkMiddleware());

app.use(fileUpload({
    useTempFiles : true ,
    tempFileDir : path.join(__dirname , "tmp") , 
    createParentPath : true ,
    limits: {
        fileSize : 10 * 1024 * 1024 
    }
  }));

app.use("/api/users" , userRoutes)
app.use("/api/auth" , authRoutes)
app.use("/api/admin" , adminRoutes)
app.use("/api/songs" , songRoutes)
app.use("/api/albums" , albumRoutes)
app.use("/api/stats" , statRoutes)



connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })





// todo socket io implementtion 