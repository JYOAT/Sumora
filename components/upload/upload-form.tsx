"use client";
import z from "zod";
import UploadFormInput from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import {
  generatePdfSummary,
  storePdfSummaryAction,
} from "@/actions/upload-action";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "./loading-skeleton";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "Only PDF files are allowed"
    )
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size should be less than 20MB"
    ),
});
export default function UploadForm() {
  // const {toast} = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("Error occurred while uploading", err);
      toast.error("Error occurred while uploading", {
        description: err.message,
      });
    },
    onUploadBegin: (data) => {
      console.log("upload has begun for", data);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      //validate the fields
      const validatedFields = schema.safeParse({ file });
      if (!validatedFields.success) {
        toast.error("Something went wrong", {
          description:
            validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file",
        });
        setLoading(false);
        return;
      }

      toast("Uploading PDF...", {
        description: "We are uploading your PDF!",
      });

      //schema with zod
      //upload the file to uploadthing
      const resp = await startUpload([file]);
      if (!resp) {
        toast.error("Something went wrong", {
          description: "Please use a different file",
        });
        setLoading(false);
        return;
      }

      toast("Processing pdf", {
        description: "Hang tight! our AI is reading through your document",
      });

      const fileUrl = resp[0].serverData.fileUrl;

      //parse the pdf using langchain
      const result = await generatePdfSummary({
        fileUrl: fileUrl,
        fileName: file.name,
      });
      const { data = null, message = null } = result || {};

      if (data) {
        let storeResult: any;

        toast("Saving pdf", {
          description: "Hang tight! We are saving your summary",
        });

        if (data.summary) {
          storeResult = await storePdfSummaryAction({
            summary: data.summary,
            fileUrl: fileUrl,
            title: data.formattedFileName,
            fileName: file.name,
          });

          //save the summary to the database
          toast("Summary generated", {
            description: "Your summary has been saved!",
          });

          formRef.current?.reset();
          router.push(`/summaries/${storeResult.data.id}`); //redirect to the summary page
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error occurred", error);
      formRef.current?.reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        loading={loading}
        ref={formRef}
        onSubmit={handleSubmit}
      />

      {loading && (
        <>
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-muted-foreground text-sm">
                Processing
              </span>
            </div>
          </div>

          <LoadingSkeleton />
        </>
      )}
    </div>
  );
}
