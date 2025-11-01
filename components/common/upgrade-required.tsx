import { ArrowRight, Sparkles } from "lucide-react";
import BgGradient from "./bg-gradient";
import { Button } from "../ui/button";
import Link from "next/link";

export const UpgradeRequired = () => {
  return (
    <div className="relative min-h-[50vh] flex flex-col items-center justify-center">
      {/* Background gradient */}
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />

      <div className="container px-8 py-16 flex flex-col items-center justify-center text-center">
        {/* Centered content */}
        <div className="flex flex-col items-center justify-center gap-8 max-w-2xl mx-auto">
          {/* Centered "Premium Feature" badge */}
          <div className="flex items-center justify-center gap-2 text-rose-600">
            <Sparkles className="w-6 h-6" />
            <span className="text-sm font-medium uppercase tracking-wider">
              Premium Feature
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Subscription Required
          </h1>

          {/* Description box */}
          <p className="text-lg leading-8 text-gray-600 border-2 border-rose-200 bg-white/50 backdrop-blur-xs rounded-lg p-6 border-dashed max-w-xl">
            You need to upgrade to the Basic or Pro plan to access this feature.
          </p>

          {/* Centered button with natural width */}
          <Button
            asChild
            className="bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white px-6 py-3 rounded-md w-auto"
          >
            <Link href={"/#pricing"} className="flex gap-2 items-center">
              View Pricing Plans <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
