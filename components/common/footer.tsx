"use client";

import { cn } from "@/lib/utils";

export const Footer = () => {
  return (
    <footer
      className={cn(
        "w-full mt-10 py-6 flex flex-col items-center justify-center text-center text-sm",
        "bg-gradient-to-r from-pink-200 via-orange-200 to-pink-100 dark:from-pink-900 dark:via-orange-800 dark:to-pink-900",
        "border-t border-amber-200 dark:border-orange-900 text-neutral-700 dark:text-neutral-200"
      )}
    >
      <p className="font-semibold text-orange-800 dark:text-orange-200 text-base">
        Sumora
      </p>
      <p className="text-xs mt-1 opacity-80">
        © {new Date().getFullYear()} Sumora. All rights reserved.
      </p>
      <p className="text-xs mt-1 opacity-80">
        Built with ❤️ using Next.js, Clerk, and Razorpay
      </p>
    </footer>
  );
};
