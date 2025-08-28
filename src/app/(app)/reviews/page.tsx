import React from "react";
import ReviewsClient from "./ReviewsClient";
import CustomHeader from "@/components/header-footers/CustomHeader";
import Footer from "@/components/header-footers/footer";

export default async function ReviewPageForUsers({
  searchParams,
}: {
  searchParams: Promise<{ t_id: string }>;
}) {
  const { t_id } = await searchParams;
  return (
    <>
    <CustomHeader/>
      <ReviewsClient params={{ t_id }} />
      <Footer/>
    </>
  );
}
