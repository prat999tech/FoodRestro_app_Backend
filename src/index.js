import dotenv from 'dotenv';
dotenv.config({ path: './env' });
import connectDB from "./db/index_db.js"
import app from "./app.js"


connectDB().then(()=>{
    app.listen(process.env.PORT||8000,() => {
        console.log(`app is listening on port ${process.env.PORT}`);
        
    })
    
})
.catch((error)=>{
    console.log(error);
    console.log("mongodb connection failed");
    process.exit(1);
    
    
})
