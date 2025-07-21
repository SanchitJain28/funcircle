import React, { Suspense } from "react";
import UpdateClient from "./updateClient";

export default function page() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <UpdateClient />
    </Suspense>
  );
}
