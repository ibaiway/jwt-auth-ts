import bcrypt from 'bcrypt';
import UserModel from '../models/user-model';

const adminData = {
  username: 'jobx_admin',
  email: 'admin@jobx.com',
  password: 'aJOBX90_min25k.',
  role: 1
};

export async function seedAdmin() {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(adminData.password, salt);
  try {
    await UserModel.deleteOne({ email: adminData.email });
    const user = await UserModel.create({
      username: adminData.username,
      email: adminData.email,
      password: hash,
      role: adminData.role
    });
    if (user) {
      console.log('Admin seeder completed');
    }
  } catch (error) {
    throw error;
  }
}
