import { env } from "process";

type PriceType = {
  id: "basic" | "pro";
  name: string;
  price: string;
  description: string;
  items: string[];
  priceId?: string;
};
export const pricingPlans: PriceType[] = [
  {
    id: "basic",
    name: "Basic",
    price: "500",
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    description: "Ideal for personal use",
    priceId:
      process.env.NODE_ENV === "development"
        ? process.env.RAZORPAY_PLAN_ID_BASIC
        : "",
  },
  {
    id: "pro",
    name: "Pro",
    price: "1000",
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown export",
    ],
    description: "Perfect for professionals and businesses",
    priceId:
      process.env.NODE_ENV === "development"
        ? process.env.RAZORPAY_PLAN_ID_PRO
        : "",
  },
];
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1 },
  transition: {
    type: "spring",
    stiffness: 50,
    damping: 15,
    duration: 0.8,
  },
};
