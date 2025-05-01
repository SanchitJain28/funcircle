// app/product/page.tsx
import React from "react";
import ProductDetails from "@/app/components/ProductDetails";
import { Suspense } from "react";
import Navbar from "@/app/components/Navbar";


export default function ProductPage() {
  return (
    <Suspense fallback={<div className="text-center text-xl py-10">Loading Product...</div>}>
      <Navbar/>
      <ProductDetails/>
    </Suspense>
  );
}
