// app/product/page.tsx
import React from "react";
import ProductDetails from "@/app/components/ProductDetails";
import { Suspense } from "react";


export default function ProductPage() {
  return (
    <Suspense fallback={<div className="text-center text-xl py-10">Loading Product...</div>}>
      <ProductDetails/>
    </Suspense>
  );
}
