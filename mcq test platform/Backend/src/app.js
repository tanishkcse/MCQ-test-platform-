import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({
    limit: "16kb"
}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public")) // to store images and favicon
app.use(cookieParser()) // to perform CRUD operation on user browser from server

// 

// routes import
import userRouter from './routes/user.routes.js'
import questionRouter from './routes/question.routes.js';
import testRouter from './routes/test.routes.js';
// import testRouter from './routes/test.routes.js';

app.get("/",(req,res) =>{
    res.send("hello");
    res.end();
})

//routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/tests", testRouter);
// app.use("/api/v1/tests", testRouter);
// app.get("/",function(req, res){
//     res.send("hello");
// })

// http://localhost:8000/api/v1/users/register


export {app}