const logger =(req,res,next)=>{
    console.log(`method: ${req.method} url:${req.originalUrl}`)//template literals
    // if(req.method=="Delete")
    // {
    //     return res.status(405).send("delete not allowed");
    // }
    
    next();
    }
    export default logger;
    