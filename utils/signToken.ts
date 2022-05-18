import jsonwebtoken from 'jsonwebtoken';
import CONFIG from '../config/config';

//FOR TESTING PURPOSES TOKENS EXPIRE AFTER 2 MINUTES
function signToken(id: String, email: String, role: number) {
  return jsonwebtoken.sign(
    {
      id,
      email,
      role
    },
    CONFIG.JWT_SECRET,
    { expiresIn: '2min' }
  );
}

export default signToken;
