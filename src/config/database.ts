import mongoose, { ConnectOptions } from 'mongoose';


const connectDB = async (): Promise<void> => {
	try {
		const conn = await mongoose.connect("mongodb://192.168.1.102:27017/express-typescript");
		console.log(`MongoDB connected: ${conn.connection.host}`);
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log(`Error: ${error.message}`);
		} else {
			console.log('Connection error try again');
		}
		process.exit(1);
	}
};

export default connectDB;
