import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import ProductCard from "./productCard";
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}


export default function ProductCarousel({data}: {data: Product[]}) {
  return (
    <div>
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {data.map((product: Product, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="">
                <ProductCard
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  id={product.id}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
