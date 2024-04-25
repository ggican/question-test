const jwt = require('jsonwebtoken');

const secretKey = 'IKHSAN-MAHENDRI';

export const authenticateUser = async (values: any): Promise<string | null> => {
  // Generate JWT token
  const token = jwt.sign(values, secretKey, {
    expiresIn: '1h',
  });
  return token;
};

// Function to verify token and extract user ID
export const verifyToken = (token: string): any | null => {
  try {
    if (!token || typeof token !== 'string') {
      throw new Error('Invalid token');
    }
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null; // Token verification failed
  }
};
