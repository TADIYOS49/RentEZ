import cloudinary from "cloudinary";

export const Cloudinary = {
    upload: async (image: string) => {
        /* eslint-disable @typescript-eslint/camelcase */
        const res = await cloudinary.v2.uploader.upload(image, {
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            cloud_name: process.env.CLOUDINARY_NAME,
            folder: "RENTEZ_Assets/",
        });

        return res.secure_url;
        /* eslint-enable @typescript-eslint/camelcase */
    },
};
