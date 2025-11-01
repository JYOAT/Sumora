"use client";
import { forwardRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(
  ({ onSubmit, loading }, ref) => {
    return (
      <form ref={ref} className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex gap-1.5 items-center justify-center">
          <Input
            id="file"
            name="file"
            accept="application/pdf"
            required
            className={cn(loading && "opacity-50 cursor-not-allowed")}
            type="file"
            disabled={loading}
          ></Input>
          <Button disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
              </>
            ) : (
              "Upload your PDF"
            )}
          </Button>
        </div>
      </form>
    );
  }
);

UploadFormInput.displayName = "UploadFormInput";

export default UploadFormInput;
