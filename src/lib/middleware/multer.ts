import multer from "multer";
import { randomUUID } from "crypto";
import mime from "mime";

export const generatePhotoFilename = (mimeType: string) => {
    const randomFilename = `${randomUUID()}-${Date.now()}`;
    const fileExtension = mime.getExtension(mimeType);
    const filename = `${randomFilename}.${fileExtension}`;

    return filename;
};

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (request, file, callback) => {
        return callback(null, generatePhotoFilename(file.mimetype));
    },
});

const MAX_SIZE_IN_MEGABYTES = 6 * 1024 * 1024;

const VALID_MIME_TYPE = ["image/png", "image/jpeg"];

const fileFilter: multer.Options["fileFilter"] = (request, file, callback) => {
    if (VALID_MIME_TYPE.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(
            new Error("Error: The uploaded file must be a JPG or PNG image")
        );
    }
};

export const multerOptions = {
    fileFilter,
    lmitis: {
        filesize: MAX_SIZE_IN_MEGABYTES,
    },
};

export const initMulterMiddleware = () => {
    return multer({ storage, ...multerOptions });
};
