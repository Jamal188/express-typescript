import multer from "multer";
import path from "path";
import { Request } from "express";


const uploadDir = process.env.UPLOAD_DIR

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {

    const sanitizedName = file.originalname
      .replace(/[^a-zA-Z0-9.]/g, "_") 
      .toLowerCase();
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniquePrefix}-${sanitizedName}`); 
  },
});


const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPG, PNG, or WEBP allowed."));
  }
};


export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
});