import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import db from "./config/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/notes", notesRoutes);

// async function connectDB(){
//     try{
//         await db;
//         console.log("It looks like success");
//     } catch(e){
//         console.log("DB connection failed: " + e);
//     }
// }

// connectDB().then(() => {
//     app.listen(PORT, () => {
//     console.log("Server is running on port " + PORT)
// });

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
