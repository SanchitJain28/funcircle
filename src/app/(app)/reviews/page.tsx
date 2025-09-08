import React from "react";
import ReviewsClient from "./ReviewsClient";
import CustomHeader from "@/components/header-footers/CustomHeader";

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
    </>
  );
}
