import mongoose from 'mongoose'

const connectDb = async () => {
    if (mongoose.connection.readyState) {
        return;
    }
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        const db = await mongoose.connect(process.env.MONGO_URI);

        const url = `${db?.connection.host}:${db?.connection.port}`
        console.log(`MongoDB conectando en: ${url} `)

    } catch (error) {
        if (error instanceof Error) {
            console.log(`error: ${error.message}`);
        } else {
            console.log(`error: ${String(error)}`);
        }
        process.exit(1)
    }
}


export default connectDb;