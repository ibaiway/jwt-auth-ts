import mongoose from 'mongoose';
import CONFIG from '../config/config';

function connect() {
  return mongoose.connect(CONFIG.MONGO_URI);
}

export default connect;
