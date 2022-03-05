import * as bcrypt from 'bcrypt';

/**
 * Generate salt
 * @returns {String} salt
 */
export const genSalt = async () => {
  const salt = await bcrypt.genSalt();
  return salt;
};

/**
 * Generates hash
 * @param password
 * @returns {String} hash
 */
export const generateHash = async (password: string): Promise<string> => {
  const salt = await genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

/**
 * Compare password and hash
 * @param password
 * @param hash
 * @returns {Boolean} isMatch
 */
export const isPasswordHashMatch = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
