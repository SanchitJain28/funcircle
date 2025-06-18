import CompleteProfile from "@/components/complete-profile/completeProfile";
import React, { Suspense } from "react";
export default function CompleteProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompleteProfile />
    </Suspense>
  );
}
