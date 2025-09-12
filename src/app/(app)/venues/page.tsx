import React, { Suspense } from "react";
import { VenuesClient } from "./VenuesClient";

export default function page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <VenuesClient />
      </Suspense>
    </div>
  );
}
