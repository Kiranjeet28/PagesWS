import mongoose, { Schema, Document } from 'mongoose';
import { UserEmail } from '@/type/Main'; // Assuming UserWebLink is not needed

// Mongoose schema for userEmail with array of URLs
const adminSchema: Schema<IAdmin> = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'password is required']
  }
});

interface IAdmin extends Document {
    email: UserEmail;
    password : String;
}


const AdminModel = (mongoose.models.Email as mongoose.Model<IAdmin>) ||
mongoose.model<IAdmin>('admin', adminSchema);

export default AdminModel;
