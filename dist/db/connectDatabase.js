import mongoose from "mongoose";
const { MONGODB_URI } = process.env;
if (!MONGODB_URI) {
    throw new Error("MONGODB_URI not define in environment variables");
}
const connectDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connect database successfully");
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(`Connect database error ${error.message}`);
            throw error;
        }
        console.log(`Unknown error ${error}`);
    }
};
export default connectDatabase;
//# sourceMappingURL=connectDatabase.js.map