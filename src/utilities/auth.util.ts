import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, saltRounds);
}

export async function comparePasswords(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateJwtToken(
  payload: Record<'email' | 'role', string>,
): string {
  const secretKey = process.env.JWT_SECRET_KEY || 'your_jwt_secret_key';
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

export function verifyJwtToken(
  token: string,
): Record<'email' | 'role', string> | null {
  const secretKey = process.env.JWT_SECRET_KEY || 'your_jwt_secret_key';
  try {
    return jwt.verify(token, secretKey) as Record<'email' | 'role', string>;
  } catch (error) {
    console.error(error);
    return null;
  }
}
