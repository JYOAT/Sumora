import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { getAuth } from "@clerk/nextjs/server";

import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } })
    .middleware(async ({ req }) => {
      //get user info
      const user = await currentUser();
      console.log(user, "userrrrrrrrrrr");
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload completed for user id", metadata.userId);
      console.log("file url", file.ufsUrl);
      return {
        userId: metadata.userId,
        fileUrl: file.ufsUrl,
        filName: file.name,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
