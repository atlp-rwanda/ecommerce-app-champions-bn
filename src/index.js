import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import swaggerDocs from "./api-docs/swagger";

const app = express();

app.use(express.json());
app.use(cors({origin:"*"}));
dotenv.config();

const port = process.env.PORT ? process.env.PORT : 501

app.listen(port,() =>{
    console.log(`Server is running on http://localhost:${port}`)
})

swaggerDocs(app);

app.use("/",(req,res) =>{
    res.send('<h2>Welcome to our Ecommerce App</h2>')
})