import multer, { StorageEngine, FileFilterCallback } from "multer";
import { Request } from "express";

const storage: StorageEngine = multer.memoryStorage();

const uploadImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Tipo de arquivo não permitido"));
    }

    cb(null, true); 
  },
});

export default uploadImage;
