import mongoose, { Schema, Document } from 'mongoose';
import { UserEmail,UserWebLink } from '@/type/Main'; // Assuming UserWebLink is not needed

// Mongoose schema for userEmail with array of URLs
const EmailSchema: Schema<IEmail> = new mongoose.Schema({
  userEmail: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  count: {
    type: Number,
    required: [true, 'Count is required'],
  },
  urls: { // Use lowercase 'urls' for consistency
    type: [String], // Array of strings for URLs
    required: [true, 'URLs are required'],
     },
});

// Create a Mongoose model
interface IEmail extends Document {
  userEmail: UserEmail;
  count: number;
  urls: UserWebLink[]; // Array of strings
}

const EmailModel = (mongoose.models.Email as mongoose.Model<IEmail>) ||
  mongoose.model<IEmail>('Email', EmailSchema);

export default EmailModel;
