import bcryptjs from 'bcryptjs';
const SALT_ROUNDS = 10;

export function hashPassword(password: string): string {
  return bcryptjs.hashSync(password, SALT_ROUNDS);
}

export function comparePassword(password: string, hash: string) {
  return bcryptjs.compareSync(password, hash);
}