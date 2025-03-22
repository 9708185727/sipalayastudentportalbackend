import mongoose  from 'mongoose';

// mongoose.connect(`${mongoUri}/dbcodeit`);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected..");
  } 
  catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
export default connectDB;