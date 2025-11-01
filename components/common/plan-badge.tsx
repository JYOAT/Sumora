import { getPriceId } from "@/lib/users";
import { pricingPlans } from "@/utils/constants";
import { currentUser } from "@clerk/nextjs/server";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";

export const PlanBadge = async () => {
  const user = await currentUser();
  if (!user?.id) return null;

  const email = user?.emailAddresses[0]?.emailAddress;

  let priceId = null;
  if (email) {
    priceId = await getPriceId(email!);
  }

  let planName = "Buy a Plan";

  const plan = pricingPlans.find((p) => p.priceId === priceId);
  if (plan) {
    planName = plan.name;
  }

  return (
    <Badge
      variant={"outline"}
      className={cn(
        "ml-2 bg-linear-to-r from-amber-100 to-amber-200 border-amber-300 hidden lg:flex flex-row items-center",
        !priceId && "border-red-300 from-red-100 to-red-200"
      )}
    >
      <Crown
        className={cn(
          "w-3 h-3 mr-1 text-amber-600",
          !priceId && "text-red-600"
        )}
      ></Crown>
      {planName}
    </Badge>
  );
};
