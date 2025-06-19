import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  className?: string;
  onAddToCart?: (id: string) => void;
}

const ProductCard = ({
  id,
  name,
  price,
  image,
  className,
  onAddToCart,
}: ProductCardProps) => {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(id);
    }
  };
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/product?id=${id}`)}
      className={
        "flex flex-col rounded-md border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white " +
        className
      }
    >
      <div className="h-40  ">
        <img src={image} alt={name} className="w-full h-full " />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-medium text-sm text-gray-800 ">{name}</h3>
        <div className="mt-auto flex  flex-col justify-between">
          <span className="text-sm font-semibold text-gray-900">
            ₹{price.toFixed(2)}
          </span>
          <Button
            size="sm"
            className="bg-[#9b87f5] hover:bg-[#7E69AB]"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-1 h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
