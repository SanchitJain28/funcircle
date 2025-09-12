import React, { Suspense } from "react";
import HeaderWithSearchParams from "./HeaderWithSearchParam";

export default function CustomHeader() {
  return (
    <div>
      <Suspense fallback={<div>Laoding</div>}>
        <HeaderWithSearchParams />
      </Suspense>
    </div>
  );
}
