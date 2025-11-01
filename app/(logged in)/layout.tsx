import { UpgradeRequired } from "@/components/common/upgrade-required";
import { hasActivePlan } from "@/lib/users";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const hasActiveSubscription = await hasActivePlan(
    user.emailAddresses[0]?.emailAddress
  );

  if (!hasActiveSubscription) {
    return <UpgradeRequired></UpgradeRequired>;
  }
  return <>{children}</>;
}
