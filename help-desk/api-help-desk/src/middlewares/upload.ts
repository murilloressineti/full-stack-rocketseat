import multer from "multer";
import { AppError } from "@/utils/AppError";

const storage = multer.memoryStorage();

function fileFilter(
  request: Express.Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback,
) {
  const allowedMimes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedMimes.includes(file.mimetype)) {
    return callback(new AppError("Invalid image format", 400));
  }

  callback(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});

export { upload };
