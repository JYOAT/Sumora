"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon } from "lucide-react";
import Script from "next/script";
import { useUser } from "@clerk/nextjs";
import {
  containerVariants,
  itemVariants,
  pricingPlans,
} from "@/utils/constants";
import { MotionDiv, MotionSection } from "../common/motion-wrapper";

const plans = pricingPlans;

export default function PricingSection() {
  const { user } = useUser(); // ✅ Clerk user

  async function handleBuy(planType: "basic" | "pro") {
    try {
      const res = await fetch("/api/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planType,
          userEmail:
            user?.primaryEmailAddress?.emailAddress || "guest@example.com",
          userId: user?.id || null,
        }),
      });

      const data = await res.json();

      if (!data.subscriptionId) {
        alert("❌ Failed to create subscription. Try again later.");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        subscription_id: data.subscriptionId,
        name: "Sumora",
        description: `${planType.toUpperCase()} Plan Subscription`,
        handler: function (response: any) {
          console.log("✅ Subscription successful:", response);
          alert("Subscription successful!");
        },
        theme: { color: "#ec4899" },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("❌ Subscription error:", err);
      alert("Something went wrong while creating the subscription.");
    }
  }

  return (
    <>
      {/* Razorpay Checkout Script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <MotionSection
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative overflow-hidden pb-24"
        id="pricing"
      >
        <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
          <MotionDiv
            variants={itemVariants}
            className="flex items-center justify-center w-full"
          >
            <h2 className="uppercase font-bold text-xl mb-8 text-rose-500">
              Pricing
            </h2>
          </MotionDiv>
        </div>

        {/* ✅ Motion added here */}
        <MotionDiv
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8"
        >
          {plans.map((plan) => (
            <MotionDiv
              key={plan.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px rgba(236, 72, 153, 0.2)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className={cn(
                "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl bg-white dark:bg-gray-900 shadow-sm",
                plan.id === "pro" && "border-rose-500 gap-5 border-2"
              )}
            >
              <div className="flex justify-between items-center gap-4">
                <div>
                  <p className="text-lg lg:text-xl font-bold capitalize">
                    {plan.name}
                  </p>
                  <p className="text-base-content/80 mt-2">
                    {plan.description}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <p className="text-5xl tracking-tight font-extrabold">
                  {plan.price}
                </p>
                <div className="flex flex-col justify-end mb-[4px]">
                  <p className="text-xs uppercase font-semibold">Rps</p>
                  <p className="text-xs">/month</p>
                </div>
              </div>

              <div className="space-y-2.5 leading-relaxed text-base flex-1">
                {plan.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckIcon size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </div>

              <MotionDiv
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="space-y-2 flex justify-center w-full"
              >
                <button
                  onClick={() => handleBuy(plan.id)}
                  className={cn(
                    "w-full flex rounded-full items-center justify-center gap-2 bg-gradient-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2 transition-all duration-300",
                    plan.id === "pro"
                      ? "border-rose-900"
                      : "border-rose-100 from-rose-400 to-rose-500"
                  )}
                >
                  Buy Now <ArrowRight size={18} />
                </button>
              </MotionDiv>
            </MotionDiv>
          ))}
        </MotionDiv>
      </MotionSection>
    </>
  );
}
