import { diskStorage } from 'multer';
import { basename, extname } from 'path';
import * as fs from 'fs-extra';
/**
 * Get filename without extension
 * @param filePath
 * @returns {String} filename
 */
export const getFilenameWithoutExt = (filePath: string) =>
  basename(filePath, extname(filePath));

/**
 * Generate Multer (file) storage
 * @param destination
 * @returns Multer storage
 */
export const generateMulterStorage = (destination: string) => {
  try {
    if (!fs.existsSync(destination)) fs.mkdirSync(destination);
  } catch (e) {
    console.error(e);
  }
  return diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + extname(file.originalname));
    },
  });
};
