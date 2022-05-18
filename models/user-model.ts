import mongoose, { trusted } from 'mongoose';

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    minLength: 8
  },
  role: {
    type: Number,
    default: 0
  }
});

const UserModel = mongoose.model('user', UserSchema);
export default UserModel;
