import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  otp?: string | null; // OTP can be a string or null
  otpExpires?: Date | null; // OTP expiration can be a Date or null
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String, default: null },
  otpExpires: { type: Date, default: null }
});

export default mongoose.model<IUser>('User', UserSchema);
