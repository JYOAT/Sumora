import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const { planType, userEmail, userId } = await req.json();

    // 🔹 Map your plan types to plan IDs
    const planId =
      planType === "basic"
        ? process.env.RAZORPAY_PLAN_ID_BASIC!
        : process.env.RAZORPAY_PLAN_ID_PRO!;

    // ✅ Create Razorpay subscription
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      total_count: 12, // e.g. 12 billing cycles (monthly)
      customer_notify: 1,
      notes: {
        planType, // "basic" or "pro"
        price_id: planId, // Razorpay plan ID
        email: userEmail || "", // optional, if user logged in
        user_id: userId || "", // optional, internal reference
        created_by: "nextjs_app", // optional, just for tracking
      },
    });

    return NextResponse.json({
      subscriptionId: subscription.id,
      planId,
    });
  } catch (err: any) {
    console.error("❌ Error creating subscription:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
