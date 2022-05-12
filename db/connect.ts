import mongoose from 'mongoose';
import CONFIG from '../config/config';

//const DBURL: string = CONFIG.db.url;
function connect() {
  return mongoose.connect(CONFIG.MONGO_URI);
}

export default connect;
