import { getDbConnection } from "./db";

/**
 * --- Type definition for Razorpay Subscription Webhook Payload ---
 */
export interface RazorpaySubscriptionPayload {
  event:
    | "subscription.activated"
    | "invoice.paid"
    | "subscription.charged"
    | "subscription.cancelled";
  payload: {
    subscription?: {
      entity: {
        id: string;
        customer_id: string;
        status: string;
        plan_id: string;
        notes?: {
          price_id?: string;
          [key: string]: string | undefined;
        };
      };
    };
    invoice?: {
      entity: {
        id: string;
        subscription_id: string;
        customer_id: string;
        amount_paid: number;
        status: string;
        payment_id: string;
        customer_details?: {
          email?: string;
          customer_email?: string;
        };
      };
    };
  };
}

export async function handleRazorpayWebhook(
  payload: RazorpaySubscriptionPayload
) {
  const eventType = payload.event;
  const sql = await getDbConnection();

  console.log(`📩 Razorpay Event Received: ${eventType}`);

  try {
    switch (eventType) {
      /**
       * 🔹 SUBSCRIPTION ACTIVATED
       * Create user if not exists, but do not overwrite valid email/plan.
       */
      case "subscription.activated": {
        const sub = payload.payload.subscription?.entity;
        if (!sub) {
          console.error("No subscription entity found");
          return;
        }

        const priceId = sub.notes?.price_id || sub.plan_id;
        const customerId = sub.customer_id;

        // Check if user already exists
        const existingUser =
          await sql`SELECT * FROM users WHERE customer_id = ${customerId}`;

        if (existingUser.length === 0) {
          await sql`
            INSERT INTO users (email, full_name, customer_id, price_id, status)
            VALUES ('unknown@example.com', 'N/A', ${customerId}, ${priceId}, 'active')
          `;
          console.log("👤 New user created:", customerId);
        } else {
          // Keep existing correct email & plan
          const current = existingUser[0];
          const newEmail =
            current.email !== "unknown@example.com"
              ? current.email
              : "unknown@example.com";
          const newPrice =
            current.price_id && current.price_id !== "subscription_plan"
              ? current.price_id
              : priceId;

          await sql`
            UPDATE users
            SET email = ${newEmail},
                price_id = ${newPrice},
                status = 'active',
                updated_at = NOW()
            WHERE customer_id = ${customerId}
          `;

          console.log("🔄 Existing user retained valid info:", newEmail);
        }

        console.log("✅ Subscription activated:", sub.id);
        break;
      }

      /**
       * 🔹 INVOICE PAID
       * Update correct email & record payment.
       */
      case "invoice.paid": {
        const invoice = payload.payload.invoice?.entity;
        if (!invoice) {
          console.error("No invoice entity found");
          return;
        }

        const amountTotal = invoice.amount_paid / 100;
        const paymentId = invoice.payment_id;
        const customerId = invoice.customer_id;

        // ✅ Extract real email
        const userEmail =
          invoice.customer_details?.email ||
          invoice.customer_details?.customer_email ||
          "unknown@example.com";

        // 🔍 Find user
        const userRows =
          await sql`SELECT * FROM users WHERE customer_id = ${customerId}`;
        let user = userRows[0];

        if (user) {
          // Update email if still placeholder
          const emailToUse =
            user.email === "unknown@example.com" ? userEmail : user.email;
          await sql`
            UPDATE users
            SET email = ${emailToUse},
                updated_at = NOW()
            WHERE customer_id = ${customerId}
          `;
          user.email = emailToUse;
        } else {
          // No user yet, create new
          const newUser = await sql`
            INSERT INTO users (email, customer_id, price_id, status)
            VALUES (${userEmail}, ${customerId}, 'subscription_plan', 'active')
            RETURNING *
          `;
          user = newUser[0];
        }

        // 💾 Insert payment (price_id removed)
        await sql`
          INSERT INTO payments (user_id, amount, status, razorpay_payment_id, user_email)
          VALUES (${user.id}, ${amountTotal}, 'paid', ${paymentId}, ${user.email})
        `;

        // Update user info just in case
        await sql`
          UPDATE users
          SET email = ${user.email},
              updated_at = NOW()
          WHERE id = ${user.id}
        `;

        console.log("💰 Invoice paid successfully for:", user.email);
        break;
      }

      /**
       * 🔹 SUBSCRIPTION CANCELLED
       */
      case "subscription.cancelled": {
        const sub = payload.payload.subscription?.entity;
        if (!sub) {
          console.error("No subscription entity found");
          return;
        }

        const customerId = sub.customer_id;
        await sql`
          UPDATE users
          SET status = 'cancelled', updated_at = NOW()
          WHERE customer_id = ${customerId}
        `;

        console.log("❌ Subscription cancelled:", sub.id);
        break;
      }

      default:
        console.log("⚠️ Unhandled Razorpay event:", eventType);
        break;
    }
  } catch (error) {
    console.error("❌ Error handling Razorpay webhook:", error);
  }
}
