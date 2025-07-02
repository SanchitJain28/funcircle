import React, { Suspense } from "react";
import AdminClient from "./adminClient";

export default function AdminPage() {
  return (
    <div>
      <Suspense fallback={<>Loading</>}>
        <AdminClient />
      </Suspense>
    </div>
  );
}
