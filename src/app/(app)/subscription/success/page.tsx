import React, { Suspense } from "react";
import SuccessSubscriptionPage from "./SucessClient";

export default function page() {
  return (
    <div>
      <Suspense fallback={<div>Loading</div>}>
        <SuccessSubscriptionPage />
      </Suspense>
    </div>
  );
}
