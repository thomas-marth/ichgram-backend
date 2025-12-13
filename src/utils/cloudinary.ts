import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

import HttpError from "./HttpError.js";

const {
  CLOUDINARY_CLOUD_NAME: cloudName,
  CLOUDINARY_API_KEY: apiKey,
  CLOUDINARY_API_SECRET: apiSecret,
} = process.env;

const isCloudinaryConfigured = Boolean(cloudName && apiKey && apiSecret);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: cloudName!,
    api_key: apiKey!,
    api_secret: apiSecret!,
    secure: true,
  });
}

export const uploadBufferToCloudinary = async (
  fileBuffer: Buffer,
): Promise<string> =>
  new Promise((resolve, reject) => {
    if (!isCloudinaryConfigured) {
      reject(HttpError(500, "Cloudinary credentials are not configured"));
      return;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error || !result) {
          reject(HttpError(500, "Error uploading image to Cloudinary"));
          return;
        }

        resolve(result.secure_url);
      },
    );

    Readable.from(fileBuffer).pipe(uploadStream);
  });

export default cloudinary;
export { isCloudinaryConfigured };
