// app/complete-profile/page.js
import LevelAssignmentComponent from "@/components/assign-level/page";
import React, { Suspense } from "react";

export default function CompleteProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LevelAssignmentComponent />
    </Suspense>
  );
}
