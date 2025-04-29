"use client"
import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, StarHalf, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Product } from "@/app/components/productCarousel";

interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
}

const fakeReviews: Review[] = [
  {
    id: "r1",
    user: "Virat Kohli",
    rating: 5,
    date: "2025-03-12",
    comment:
      "Absolutely love this product! The sound quality is incredible and battery life exceeds my expectations.",
  },
  {
    id: "r2",
    user: "Thala",
    rating: 4.5,
    date: "2025-03-05",
    comment:
      "Great value for money. Very comfortable to wear for extended periods. Would definitely recommend.",
  },
  {
    id: "r3",
    user: "Sanchit jain",
    rating: 4,
    date: "2025-02-28",
    comment:
      "Good product overall. The build quality is solid, though I wish it came with a carrying case.",
  },
  {
    id: "r4",
    user: "Ramesh",
    rating: 5,
    date: "2025-02-15",
    comment:
      "Perfect for my daily commute! The noise cancellation feature works better than I expected.",
  },
];

const ProductDetails = () => {
  const router = useRouter();
  const [product, setProduct] = React.useState<Product | null>(null);
  const searchParams = useSearchParams();
  const fetchFakeProduct = async () => {
    const { data } = await axios.post(`/api/FakeProduct?id=${searchParams.get("id")}`);
    console.log(data[0])
    setProduct(data[0])
  };
  useEffect(()=>{
    fetchFakeProduct()
  },[])

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Button onClick={() => router.push("/")}>Back to Home</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast.success(`${product.name} added to cart!`);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`star-${i}`} className="fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half-star" className="fill-yellow-400 text-yellow-400" />
      );
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Button
          variant="outline"
          className="mb-6"
          onClick={() => router.push("/")}
        >
          Back to Products
        </Button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6 flex items-center justify-center">
              <div className="w-full max-w-md h-80 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="md:w-1/2 p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center mb-4">
                <div className="flex mr-2">{renderStars(4.5)}</div>
                <span className="text-gray-600 text-sm">(32 reviews)</span>
              </div>

              <p className="text-xl font-semibold text-gray-900 mb-4">
              ₹
              {product.price}
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Product Description
                </h3>
                <p className="text-gray-600">
                  Experience premium quality with {product.name}. This
                  state-of-the-art product combines cutting-edge technology with
                  sleek design to deliver an exceptional user experience.
                  Perfect for everyday use, it offers reliability, performance,
                  and style all in one package.
                </p>
              </div>

              <Button
                className="w-full sm:w-auto my-2 bg-[#9b87f5] hover:bg-[#7E69AB]"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button
                className="w-full sm:w-auto bg-black text-white hover:bg-black"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Checkout
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <MessageCircle className="mr-2 h-5 w-5" />
              Customer Reviews
            </h2>

            <div className="space-y-6">
              {fakeReviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-100 pb-4 last:border-b-0"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-gray-800">{review.user}</h3>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
