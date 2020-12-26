import { IncomingForm, Files, Fields } from "formidable";
import Cloudinary from "cloudinary";
import { config } from "dotenv";
import { userModel } from "../../Models/Users/Users";
import { Request, Response } from "express";

config();

interface ProfilePicUploader {
  UploadProfilePicture(request: Request, response: Response): Response;
}

const cloudinary = Cloudinary.v2;
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

class ProfilePicUploaderController implements ProfilePicUploader {
  UploadProfilePicture(request: Request, response: Response) {
    const form = new IncomingForm();
    const userSession = request.session.user;
    const user_id = userSession.id;
    const username = userSession.username;
    try {
      form.parse(request, (error, fields: Fields, files: Files) => {
        if (error) {
          return response
            .status(500)
            .json({ msg: "Network Error: Failed to upload profile picture" });
        }

        const { profilePicture } = files;

        if (!profilePicture) {
          return response.status(400).json({ msg: "No image was provided" });
        }

        cloudinary.uploader.upload(
          profilePicture.path,
          { folder: `/BragDiary/ProfileImages/${username}` },
          async (error, res) => {
            if (error) {
              return response.status(500).json({
                msg: "Network Error: Failed to upload profile picture",
              });
            }

            const image_url: string = res.secure_url;

            const updatedDoc: any = await userModel.findByIdAndUpdate(
              user_id,
              { $set: { profilePicture: image_url } },
              {
                new: true,
              }
            );
            if (updatedDoc.profilePicture.length === 0) {
              return response
                .status(500)
                .json({ msg: "Network Error: Failed to upload profile image" });
            }
            return response
              .status(200)
              .json({ msg: "Profile Picture upload was successful" });
          }
        );
      });
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Network Error: Failed to upload profile picture" });
    }
  }
}

export { ProfilePicUploaderController };
