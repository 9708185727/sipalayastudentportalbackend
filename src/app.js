import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from  './routes/authRoute.js'
import classRoute from  './routes/classRoute.js'
import courseRoute from './routes/courseRoute.js'
import logger from './middlewares/logger.js'
import connectDB from './database.js'
const app=express()

dotenv.config()
const PORT=process.env.PORT
connectDB()
app.use(logger)
app.use(express.json())
app.use(cors({
    origin:process.env.APP_URL
}))


app.get('/',(req,res)=>{
    res.json({
        appName:"sipalaya student portal",
        version:'1.1.0',
        port:PORT,
    })
})
app.use("/uploads", express.static("./uploads"));
app.use('/api/auth',authRoute)
app.use('/api/course',courseRoute)
app.use('/api',classRoute)


app.listen(PORT,()=>{
    console.log(`port is running in ${PORT} port`)
})