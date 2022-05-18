import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { randomUUID } from 'crypto';
import UserModel from '../models/user-model';
import { jobxUsers } from './jobx-users';

const adminData = {
  username: 'jobx_admin',
  email: 'admin@jobx.com',
  password: 'aJOBX90_min25k.',
  role: 1
};

async function seedAdmin() {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(adminData.password, salt);
  const id = randomUUID();
  try {
    const user = await UserModel.create({
      _id: id,
      username: adminData.username,
      email: adminData.email,
      password: hash,
      role: adminData.role
    });
    if (user) {
      console.log('Admin seeder completed');
    }
  } catch (error) {
    console.log('Error on running DB Admin seeder ', error);
    throw error;
  }
}

async function seedUsers() {
  try {
    const users = await UserModel.insertMany(jobxUsers);
    if (users) {
      console.log('Users seeder completed');
    }
  } catch (error) {
    console.log('Error on running DB Users seeder ', error);
    throw error;
  }
}
async function seeder() {
  mongoose.connections[0]
    .collection('users')
    .estimatedDocumentCount(async (_err, count) => {
      if (count === 0) {
        seedAdmin();
        seedUsers();
      } else {
        console.log('DB already has users: ' + count);
      }
    });
}

export { seeder };
