import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import {
  handleRazorpayWebhook,
  RazorpaySubscriptionPayload,
} from "@/lib/payments";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
    const signature = req.headers.get("x-razorpay-signature");
    const rawBody = await req.text();

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== signature) {
      console.error("❌ Invalid Razorpay signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event: RazorpaySubscriptionPayload = JSON.parse(rawBody);

    console.log("📨 Razorpay Webhook Event:", event.event);

    await handleRazorpayWebhook(event);

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.error("❌ Webhook error:", err);
    return NextResponse.json(
      { error: "Failed to process webhook" }, // hide details in prod
      { status: 500 }
    );
  }
}
